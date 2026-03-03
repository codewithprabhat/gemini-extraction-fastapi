from google.genai import types

from app.prompts.form_1098_t_prompts import FORM_1098_T_EXTRACTION_PROMPT
from app.schemas.form_1098_t_details import Form1098TDetails
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_1098_t_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[Form1098TDetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        FORM_1098_T_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=Form1098TDetails,
    )
