import asyncio
from dataclasses import dataclass
from typing import List, Type, TypeVar

from google import genai
from google.genai import types
from pydantic import BaseModel

from app.core.config import settings
from app.utils.common_helpers import async_retry_with_exponential_backoff

_gemini_client = genai.Client(api_key=settings.GOOGLE_API_KEY)

PydanticSchemaType = TypeVar("PydanticSchemaType", bound=BaseModel)


@dataclass
class GeminiUsage:
    input_tokens: int | None = None
    output_tokens: int | None = None
    total_tokens: int | None = None


def _extract_usage(response: object) -> GeminiUsage:
    usage_metadata = getattr(response, "usage_metadata", None)
    if not usage_metadata:
        return GeminiUsage()

    return GeminiUsage(
        input_tokens=getattr(usage_metadata, "prompt_token_count", None),
        output_tokens=getattr(usage_metadata, "candidates_token_count", None),
        total_tokens=getattr(usage_metadata, "total_token_count", None),
    )


@async_retry_with_exponential_backoff
async def generate_content_with_retries(
    model_name: str,
    contents: List[types.Part | str],
    response_schema: Type[PydanticSchemaType],
) -> tuple[PydanticSchemaType, GeminiUsage]:
    response = await asyncio.to_thread(
        _gemini_client.models.generate_content,
        model=model_name,
        contents=contents,
        config={
            "response_mime_type": "application/json",
            "response_schema": response_schema.model_json_schema(),
        },
    )

    if not response.text:
        raise ValueError("Gemini API returned empty response text.")

    parsed_data = response_schema.model_validate_json(response.text)
    usage = _extract_usage(response)
    return parsed_data, usage


@async_retry_with_exponential_backoff
async def generate_text_with_retries(
    model_name: str,
    contents: List[types.Part | str],
) -> tuple[str, GeminiUsage]:
    response = await asyncio.to_thread(
        _gemini_client.models.generate_content,
        model=model_name,
        contents=contents,
    )

    if not response.text:
        raise ValueError("Gemini API returned empty response text.")

    usage = _extract_usage(response)
    return response.text, usage
