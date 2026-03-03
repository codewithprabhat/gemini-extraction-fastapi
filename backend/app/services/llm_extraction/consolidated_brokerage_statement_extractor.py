from google.genai import types

from app.prompts.consolidated_brokerage_statement_prompts import (
    CONSOLIDATED_BROKERAGE_STATEMENT_EXTRACTION_PROMPT,
)
from app.schemas.consolidated_brokerage_statement_details import (
    ConsolidatedBrokerageStatementDetails,
)
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_consolidated_brokerage_statement_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[ConsolidatedBrokerageStatementDetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        CONSOLIDATED_BROKERAGE_STATEMENT_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=ConsolidatedBrokerageStatementDetails,
    )
