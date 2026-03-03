from google.genai import types

from app.prompts.form_1095_a_prompts import FORM_1095_A_EXTRACTION_PROMPT
from app.schemas.form_1095_a_details import Form1095ADetails
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_1095_a_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[Form1095ADetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        FORM_1095_A_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=Form1095ADetails,
    )
