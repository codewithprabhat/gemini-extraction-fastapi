from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.form_1099_sa_details import Form1099SADetails
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
    extracted_data: Optional[W2Details | Form1099SADetails] = Field(default=None)
    error_message: Optional[str] = Field(default=None)
    usage: UsageDetails = Field(default_factory=UsageDetails)
    cost: CostDetails = Field(default_factory=CostDetails)


class ProcessingResponse(BaseModel):
    type: str
    processed_documents: List[ExtractedDocument]
    request_usage: UsageDetails = Field(default_factory=UsageDetails)
    request_cost: CostDetails = Field(default_factory=CostDetails)
