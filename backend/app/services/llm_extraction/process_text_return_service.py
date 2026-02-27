from google.genai import types

from app.utils.gemini_api_client import GeminiUsage, generate_text_with_retries

PROCESS_TEXT_RETURN_MODEL = "gemini-3-flash-preview"


async def process_text_return(file_bytes: bytes, mime_type: str, prompt: str) -> tuple[str, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        prompt,
    ]
    return await generate_text_with_retries(
        model_name=PROCESS_TEXT_RETURN_MODEL,
        contents=contents,
    )
