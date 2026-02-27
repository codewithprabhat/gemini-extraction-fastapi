from typing import List

from pydantic import BaseModel, Field


class Social1099SSAEntry(BaseModel):
    taxpayer_name: str = Field(default="", description="Taxpayer name from Box 1.")
    taxpayer_social_security_number: str = Field(
        default="",
        description="Taxpayer SSN from Box 2.",
    )
    benefits_paid: float = Field(default=0, description="Benefits paid from Box 3.")
    medicare_premiums_deducted: float = Field(
        default=0,
        description="Medicare Part B premiums deducted from the Box 3 description section.",
    )
    benefits_repaid_to_ssa: float = Field(default=0, description="Benefits repaid to SSA from Box 4.")
    net_benefits: float = Field(default=0, description="Net benefits from Box 5.")
    federal_income_tax_withheld: float = Field(
        default=0,
        description="Voluntary federal income tax withheld from Box 6.",
    )
    recipient_name: str = Field(default="", description="Recipient name from Box 7 address block.")
    recipient_address: str = Field(default="", description="Recipient mailing address from Box 7 address block.")


class FormSSA1099Details(BaseModel):
    social_1099SSA: List[Social1099SSAEntry] = Field(
        default_factory=list,
        description="List of extracted SSA-1099 records in the provided document.",
    )
