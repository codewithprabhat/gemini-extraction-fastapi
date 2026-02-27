from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.schemas.response_models import ProcessTextReturnResponse, UsageDetails
from app.services.llm_extraction.process_text_return_service import (
    PROCESS_TEXT_RETURN_MODEL,
    process_text_return,
)
from app.utils.file_validation import validate_uniform_family
from app.utils.gemini_api_client import GeminiUsage

router = APIRouter()
SUPPORTED_TYPE = "1044"


def _usage_to_model(usage: GeminiUsage) -> UsageDetails:
    return UsageDetails(
        input_tokens=usage.input_tokens,
        output_tokens=usage.output_tokens,
        total_tokens=usage.total_tokens,
    )


@router.post("/process-text-return", response_model=ProcessTextReturnResponse, status_code=status.HTTP_200_OK)
async def process_text_return_endpoint(
    prompt: str = Form(...),
    file: UploadFile = File(...),
) -> ProcessTextReturnResponse:
    normalized_type = SUPPORTED_TYPE
    normalized_prompt = prompt.strip()

    if not normalized_prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Prompt is required and must be non-empty.",
        )

    try:
        validate_uniform_family([file])
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    mime_type = (file.content_type or "").lower() or "application/octet-stream"
    filename = file.filename or "unknown"

    try:
        file_bytes = await file.read()
        if not file_bytes:
            raise ValueError("Uploaded file is empty.")

        result_text, usage = await process_text_return(
            file_bytes=file_bytes,
            mime_type=mime_type,
            prompt=normalized_prompt,
        )
        return ProcessTextReturnResponse(
            type=normalized_type,
            prompt=normalized_prompt,
            model=PROCESS_TEXT_RETURN_MODEL,
            processing_status="SUCCESS",
            result_text=result_text,
            usage=_usage_to_model(usage),
        )
    except Exception as exc:
        return ProcessTextReturnResponse(
            type=normalized_type,
            prompt=normalized_prompt,
            model=PROCESS_TEXT_RETURN_MODEL,
            processing_status="PROCESSING_FAILED",
            result_text=None,
            usage=UsageDetails(),
            error_message=f"{filename}: {str(exc)}",
        )
