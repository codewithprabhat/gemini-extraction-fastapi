from google.genai import types

from app.prompts.form_1099_r_prompts import FORM_1099_R_EXTRACTION_PROMPT
from app.schemas.form_1099_r_details import Form1099RDetails
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_1099_r_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[Form1099RDetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        FORM_1099_R_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=Form1099RDetails,
    )
