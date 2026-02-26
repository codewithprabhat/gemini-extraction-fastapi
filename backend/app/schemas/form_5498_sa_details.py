from typing import List

from pydantic import BaseModel, Field


class TrusteeInformation(BaseModel):
    trustee_name: str = Field(default="", description="Name of trustee.")
    trustee_address: str = Field(default="", description="Street address of trustee.")
    trustee_city: str = Field(default="", description="City of trustee.")
    trustee_state: str = Field(default="", description="State of trustee.")
    trustee_zip_code: str = Field(default="", description="ZIP code of trustee.")
    trustee_phone_number: str = Field(default="", description="Trustee phone number.")
    trustee_tin: str = Field(default="", description="Trustee TIN.")


class ParticipantInformation(BaseModel):
    participant_name: str = Field(default="", description="Participant full name.")
    participant_address: str = Field(default="", description="Participant street address.")
    participant_city: str = Field(default="", description="Participant city.")
    participant_state: str = Field(default="", description="Participant state.")
    participant_zip_code: str = Field(default="", description="Participant ZIP code.")
    participant_tin: str = Field(default="", description="Participant TIN/SSN as shown on form.")


class ContributionInformation(BaseModel):
    employee_or_self_employed_archer_msa_contributions_box_1: float = Field(
        default=0,
        description="Box 1 employee or self-employed Archer MSA contributions.",
    )
    total_contributions_made_box_2: float = Field(default=0, description="Box 2 total contributions made.")
    contributions_made_in_subsequent_year_box_3: float = Field(
        default=0,
        description="Box 3 contributions made in subsequent year.",
    )
    rollover_contributions_box_4: float = Field(default=0, description="Box 4 rollover contributions.")
    fair_market_value_box_5: float = Field(default=0, description="Box 5 fair market value.")


class AccountTypeCheckboxes(BaseModel):
    is_hsa_box_6: bool = Field(default=False, description="Box 6 HSA checkbox.")
    is_archer_msa_box_6: bool = Field(default=False, description="Box 6 Archer MSA checkbox.")
    is_ma_msa_box_6: bool = Field(default=False, description="Box 6 MA MSA checkbox.")


class Form5498SAEntry(BaseModel):
    account_number: str = Field(default="", description="Account number.")
    trustee_information: TrusteeInformation = Field(
        default_factory=TrusteeInformation,
        description="Trustee information section.",
    )
    participant_information: ParticipantInformation = Field(
        default_factory=ParticipantInformation,
        description="Participant information section.",
    )
    contribution_information: ContributionInformation = Field(
        default_factory=ContributionInformation,
        description="Contribution information from boxes 1-5.",
    )
    account_type_checkboxes: AccountTypeCheckboxes = Field(
        default_factory=AccountTypeCheckboxes,
        description="Account type checkboxes from box 6.",
    )


class Form5498SADetails(BaseModel):
    hsa_msa_5498SA: List[Form5498SAEntry] = Field(
        default_factory=list,
        description="List of extracted 5498-SA forms in the provided document.",
    )
