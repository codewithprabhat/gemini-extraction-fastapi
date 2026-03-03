from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.core.config import settings
from app.schemas.response_models import CostDetails, ExtractedDocument, ProcessingResponse, UsageDetails
from app.services.llm_extraction.consolidated_brokerage_statement_extractor import (
    extract_consolidated_brokerage_statement_details,
)
from app.services.llm_extraction.form_1099_g_extractor import extract_1099_g_details
from app.services.llm_extraction.form_5498_extractor import extract_5498_details
from app.services.llm_extraction.form_ssa_1099_extractor import extract_ssa_1099_details
from app.services.llm_extraction.w2_extractor import extract_w2_details
from app.utils.file_validation import validate_uniform_family
from app.utils.gemini_api_client import GeminiUsage

router = APIRouter()
SUPPORTED_TYPES = {
    "w2-form",
    "5498",
    "ssa-1099",
    "1099-g",
    "consolidated-brokerage-statement",
}


def _normalize_form_type(raw_type: str) -> str:
    # Accept common client-side formatting like extra whitespace or wrapping quotes.
    return raw_type.strip().strip("\"'").lower()


def _resolve_extraction_model(form_type: str) -> str:
    if form_type in settings.gemini_complex_extraction_types:
        return settings.GEMINI_MODEL_EXTRACTION_COMPLEX
    return settings.GEMINI_MODEL_EXTRACTION


def _usage_to_model(usage: GeminiUsage) -> UsageDetails:
    return UsageDetails(
        input_tokens=usage.input_tokens,
        output_tokens=usage.output_tokens,
        total_tokens=usage.total_tokens,
    )


def _cost_from_usage(usage: GeminiUsage) -> CostDetails:
    if (
        settings.INPUT_COST_PER_MILLION is None
        or settings.OUTPUT_COST_PER_MILLION is None
        or usage.input_tokens is None
        or usage.output_tokens is None
    ):
        return CostDetails(pricing_applied=False)

    input_cost = (usage.input_tokens / 1_000_000) * settings.INPUT_COST_PER_MILLION
    output_cost = (usage.output_tokens / 1_000_000) * settings.OUTPUT_COST_PER_MILLION
    total_cost = input_cost + output_cost
    return CostDetails(
        input_cost_usd=round(input_cost, 8),
        output_cost_usd=round(output_cost, 8),
        total_cost_usd=round(total_cost, 8),
        pricing_applied=True,
    )


def _sum_usage(usages: list[GeminiUsage]) -> GeminiUsage:
    input_tokens = 0
    output_tokens = 0
    total_tokens = 0
    has_input = False
    has_output = False
    has_total = False

    for usage in usages:
        if usage.input_tokens is not None:
            input_tokens += usage.input_tokens
            has_input = True
        if usage.output_tokens is not None:
            output_tokens += usage.output_tokens
            has_output = True
        if usage.total_tokens is not None:
            total_tokens += usage.total_tokens
            has_total = True

    return GeminiUsage(
        input_tokens=input_tokens if has_input else None,
        output_tokens=output_tokens if has_output else None,
        total_tokens=total_tokens if has_total else None,
    )


@router.post("/extract", response_model=ProcessingResponse, status_code=status.HTTP_200_OK)
async def w2_extract_endpoint(
    type: str = Form(...),
    files: list[UploadFile] = File(...),
) -> ProcessingResponse:
    normalized_type = _normalize_form_type(type)
    extraction_model_name = _resolve_extraction_model(normalized_type)

    if normalized_type not in SUPPORTED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Invalid 'type'. Supported values are: "
                "w2-form, 5498, ssa-1099, 1099-g, consolidated-brokerage-statement."
            ),
        )
    if not files:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No files were provided.",
        )

    try:
        validate_uniform_family(files)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    processed_documents: list[ExtractedDocument] = []
    usage_list: list[GeminiUsage] = []

    for upload in files:
        filename = upload.filename or "unknown"
        mime_type = (upload.content_type or "").lower() or "application/octet-stream"

        try:
            file_bytes = await upload.read()
            if not file_bytes:
                raise ValueError("Uploaded file is empty.")

            if normalized_type == "w2-form":
                extracted, usage = await extract_w2_details(
                    file_bytes=file_bytes,
                    mime_type=mime_type,
                    model_name=extraction_model_name,
                )
            elif normalized_type == "5498":
                extracted, usage = await extract_5498_details(
                    file_bytes=file_bytes,
                    mime_type=mime_type,
                    model_name=extraction_model_name,
                )
            elif normalized_type == "1099-g":
                extracted, usage = await extract_1099_g_details(
                    file_bytes=file_bytes,
                    mime_type=mime_type,
                    model_name=extraction_model_name,
                )
            elif normalized_type == "consolidated-brokerage-statement":
                extracted, usage = await extract_consolidated_brokerage_statement_details(
                    file_bytes=file_bytes,
                    mime_type=mime_type,
                    model_name=extraction_model_name,
                )
            else:
                extracted, usage = await extract_ssa_1099_details(
                    file_bytes=file_bytes,
                    mime_type=mime_type,
                    model_name=extraction_model_name,
                )
            usage_list.append(usage)
            processed_documents.append(
                ExtractedDocument(
                    filename=filename,
                    mime_type=mime_type,
                    processing_status="SUCCESS",
                    extracted_data=extracted,
                    usage=_usage_to_model(usage),
                    cost=_cost_from_usage(usage),
                )
            )
        except Exception as exc:
            processed_documents.append(
                ExtractedDocument(
                    filename=filename,
                    mime_type=mime_type,
                    processing_status="EXTRACTION_FAILED",
                    error_message=str(exc),
                )
            )

    request_usage_raw = _sum_usage(usage_list)

    return ProcessingResponse(
        type=normalized_type,
        processed_documents=processed_documents,
        request_usage=_usage_to_model(request_usage_raw),
        request_cost=_cost_from_usage(request_usage_raw),
    )
