from typing import List

from pydantic import BaseModel, Field


class TrusteeInformation(BaseModel):
    trustee_name: str = Field(default="", description="Name of trustee or payer.")
    trustee_address: str = Field(default="", description="Street address of trustee.")
    trustee_city: str = Field(default="", description="City of trustee.")
    trustee_state: str = Field(default="", description="State of trustee.")
    trustee_zip_code: str = Field(default="", description="ZIP code of trustee.")
    trustee_phone: str = Field(default="", description="Trustee phone number.")
    payer_tin: str = Field(default="", description="Payer or trustee TIN.")


class RecipientInformation(BaseModel):
    recipient_name: str = Field(default="", description="Recipient full name.")
    recipient_address: str = Field(default="", description="Recipient street address.")
    recipient_city: str = Field(default="", description="Recipient city.")
    recipient_state: str = Field(default="", description="Recipient state.")
    recipient_zip_code: str = Field(default="", description="Recipient ZIP code.")
    recipient_tin: str = Field(default="", description="Recipient TIN/SSN as shown on form.")


class DistributionInformation(BaseModel):
    gross_distribution_box_1: float = Field(default=0, description="Box 1 gross distribution.")
    earnings_on_excess_contributions_box_2: float = Field(
        default=0,
        description="Box 2 earnings on excess contributions.",
    )
    distribution_code_box_3: str = Field(default="", description="Box 3 distribution code.")
    fmv_on_date_of_death_box_4: float = Field(default=0, description="Box 4 fair market value on date of death.")


class AccountTypeCheckboxes(BaseModel):
    is_hsa_box_5: bool = Field(default=False, description="Box 5 HSA checkbox.")
    is_archer_msa_box_5: bool = Field(default=False, description="Box 5 Archer MSA checkbox.")
    is_medicare_advantage_msa_box_5: bool = Field(
        default=False,
        description="Box 5 Medicare Advantage MSA checkbox.",
    )


class HealthSaving1099SAEntry(BaseModel):
    account_number: str = Field(default="", description="Account number.")
    trustee_information: TrusteeInformation = Field(
        default_factory=TrusteeInformation,
        description="Trustee information section.",
    )
    recipient_information: RecipientInformation = Field(
        default_factory=RecipientInformation,
        description="Recipient information section.",
    )
    distribution_information: DistributionInformation = Field(
        default_factory=DistributionInformation,
        description="Distribution details from boxes 1-4.",
    )
    account_type_checkboxes: AccountTypeCheckboxes = Field(
        default_factory=AccountTypeCheckboxes,
        description="Checkboxes from box 5.",
    )


class Form1099SADetails(BaseModel):
    health_saving_1999SA: List[HealthSaving1099SAEntry] = Field(
        default_factory=list,
        description="List of extracted 1099-SA forms in the provided document.",
    )
