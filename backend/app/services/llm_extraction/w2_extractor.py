from google.genai import types

from app.prompts.w2_prompts import W2_EXTRACTION_PROMPT
from app.schemas.w2_details import W2Details
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_w2_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[W2Details, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        W2_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=W2Details,
    )
