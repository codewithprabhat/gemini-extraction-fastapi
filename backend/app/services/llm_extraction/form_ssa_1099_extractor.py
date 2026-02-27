from google.genai import types

from app.core.config import settings
from app.prompts.form_ssa_1099_prompts import FORM_SSA_1099_EXTRACTION_PROMPT
from app.schemas.form_ssa_1099_details import FormSSA1099Details
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_ssa_1099_details(file_bytes: bytes, mime_type: str) -> tuple[FormSSA1099Details, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        FORM_SSA_1099_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=settings.GEMINI_MODEL_EXTRACTION,
        contents=contents,
        response_schema=FormSSA1099Details,
    )
