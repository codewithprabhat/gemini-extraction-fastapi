from google.genai import types

from app.prompts.form_1099_div_prompts import FORM_1099_DIV_EXTRACTION_PROMPT
from app.schemas.form_1099_div_details import Form1099DivDetails
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_1099_div_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[Form1099DivDetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        FORM_1099_DIV_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=Form1099DivDetails,
    )
