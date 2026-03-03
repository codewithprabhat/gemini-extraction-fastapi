from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.form_1099_g_details import Form1099GDetails
from app.schemas.form_5498_details import Form5498Details
from app.schemas.form_ssa_1099_details import FormSSA1099Details
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
    extracted_data: Optional[W2Details | Form5498Details | FormSSA1099Details | Form1099GDetails] = Field(default=None)
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
