from google.genai import types

from app.core.config import settings
from app.prompts.form_1099_sa_prompts import FORM_1099_SA_EXTRACTION_PROMPT
from app.schemas.form_1099_sa_details import Form1099SADetails
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_1099_sa_details(file_bytes: bytes, mime_type: str) -> tuple[Form1099SADetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        FORM_1099_SA_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=settings.GEMINI_MODEL_EXTRACTION,
        contents=contents,
        response_schema=Form1099SADetails,
    )
