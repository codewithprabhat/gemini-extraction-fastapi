from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.consolidated_brokerage_statement_details import ConsolidatedBrokerageStatementDetails
from app.schemas.form_1095_a_details import Form1095ADetails
from app.schemas.form_1098_details import Form1098Details
from app.schemas.form_1098_e_details import Form1098EDetails
from app.schemas.form_1099_g_details import Form1099GDetails
from app.schemas.form_1099_r_details import Form1099RDetails
from app.schemas.form_1098_t_details import Form1098TDetails
from app.schemas.form_5498_details import Form5498Details
from app.schemas.form_ssa_1099_details import FormSSA1099Details
from app.schemas.profitandloss_balancesheet_details import ProfitAndLossBalanceSheetDetails
from app.schemas.w2_details import W2Details


class UsageDetails(BaseModel):
    input_tokens: Optional[int] = Field(default=None)
    output_tokens: Optional[int] = Field(default=None)
    total_tokens: Optional[int] = Field(default=None)


class CostDetails(BaseModel):
    input_cost_usd: Optional[float] = Field(default=None)
    output_cost_usd: Optional[float] = Field(default=None)
    total_cost_usd: Optional[float] = Field(default=None)
    pricing_applied: bool = Field(default=False)


class ExtractedDocument(BaseModel):
    filename: str
    mime_type: str
    processing_status: str
    extracted_data: Optional[
        W2Details
        | Form5498Details
        | Form1095ADetails
        | Form1098Details
        | Form1098EDetails
        | Form1098TDetails
        | FormSSA1099Details
        | Form1099GDetails
        | Form1099RDetails
        | ConsolidatedBrokerageStatementDetails
        | ProfitAndLossBalanceSheetDetails
    ] = Field(default=None)
    error_message: Optional[str] = Field(default=None)
    usage: UsageDetails = Field(default_factory=UsageDetails)
    cost: CostDetails = Field(default_factory=CostDetails)


class ProcessingResponse(BaseModel):
    type: str
    processed_documents: List[ExtractedDocument]
    request_usage: UsageDetails = Field(default_factory=UsageDetails)
    request_cost: CostDetails = Field(default_factory=CostDetails)


class ProcessTextReturnResponse(BaseModel):
    type: str
    prompt: str
    model: str
    processing_status: str
    result_text: Optional[str] = Field(default=None)
    usage: UsageDetails = Field(default_factory=UsageDetails)
    error_message: Optional[str] = Field(default=None)
