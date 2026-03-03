from google.genai import types

from app.prompts.profitandloss_balancesheet_prompts import PROFITANDLOSS_BALANCESHEET_EXTRACTION_PROMPT
from app.schemas.profitandloss_balancesheet_details import ProfitAndLossBalanceSheetDetails
from app.utils.gemini_api_client import GeminiUsage, generate_content_with_retries


async def extract_profitandloss_balancesheet_details(
    file_bytes: bytes,
    mime_type: str,
    model_name: str,
) -> tuple[ProfitAndLossBalanceSheetDetails, GeminiUsage]:
    contents = [
        types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
        PROFITANDLOSS_BALANCESHEET_EXTRACTION_PROMPT,
    ]
    return await generate_content_with_retries(
        model_name=model_name,
        contents=contents,
        response_schema=ProfitAndLossBalanceSheetDetails,
    )
