from pydantic import BaseModel, Field


class W2ExtractionForm(BaseModel):
    type: str = Field(..., description="Must be 'w2-form'.")
