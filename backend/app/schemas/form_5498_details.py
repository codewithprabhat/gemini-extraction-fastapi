from typing import List

from pydantic import BaseModel, Field


class TrusteeInformation(BaseModel):
    trustee_name: str = Field(default="", description="Trustee name as shown on the form.")
    trustee_address: str = Field(default="", description="Full trustee mailing address.")
    trustee_tin: str = Field(default="", description="Trustee TIN.")


class ParticipantInformation(BaseModel):
    participant_name: str = Field(default="", description="Participant full name.")
    participant_address: str = Field(default="", description="Full participant mailing address.")
    participant_tin: str = Field(default="", description="Participant TIN/SSN (masked or unmasked as shown).")


class ContributionInformation(BaseModel):
    ira_contributions_box_1: float | int = Field(default=0, description="Box 1 IRA contributions.")
    rollover_contributions_box_2: float | int = Field(default=0, description="Box 2 rollover contributions.")
    roth_conversion_amount_box_3: float | int = Field(default=0, description="Box 3 Roth conversion amount.")
    recharacterized_contributions_box_4: float | int = Field(default=0, description="Box 4 recharacterized contributions.")
    fair_market_value_box_5: float | int = Field(default=0, description="Box 5 fair market value.")
    life_insurance_cost_box_6: float | int = Field(default=0, description="Box 6 life insurance cost included in FMV.")
    sep_contributions_box_8: float | int = Field(default=0, description="Box 8 SEP contributions.")
    simple_contributions_box_9: float | int = Field(default=0, description="Box 9 SIMPLE contributions.")
    roth_ira_contributions_box_10: float | int = Field(default=0, description="Box 10 Roth IRA contributions.")
    postponed_late_contrib_box_13a: float | int = Field(default=0, description="Box 13a postponed contributions.")
    year_box_13b: int | str = Field(default=0, description="Box 13b year.")
    code_box_13c: str = Field(default="", description="Box 13c code.")
    repayments_box_14a: float | int = Field(default=0, description="Box 14a repayments.")
    code_box_14b: str = Field(default="", description="Box 14b code.")
    fmv_of_certain_specified_assets_box_15a: float | int = Field(default=0, description="Box 15a FMV of certain specified assets.")
    codes_box_15b: str = Field(default="", description="Box 15b codes.")


class IRATypeCheckboxes(BaseModel):
    is_ira: bool = Field(default=False, description="IRA checkbox state.")
    is_sep: bool = Field(default=False, description="SEP checkbox state.")
    is_simple: bool = Field(default=False, description="SIMPLE checkbox state.")
    is_roth_ira: bool = Field(default=False, description="Roth IRA checkbox state.")


class RMDInformation(BaseModel):
    rmd_required_box_11: bool = Field(default=False, description="Box 11 RMD required checkbox.")
    rmd_date_box_12a: str = Field(default="", description="Box 12a RMD date.")
    rmd_amount_box_12b: float | int = Field(default=0, description="Box 12b RMD amount.")


class IRAContribution5498Entry(BaseModel):
    year: str | int = Field(default="", description="Tax year of the form.")
    account_number: str = Field(default="", description="Account number.")
    trustee_information: TrusteeInformation = Field(
        default_factory=TrusteeInformation,
        description="Trustee details section.",
    )
    participant_information: ParticipantInformation = Field(
        default_factory=ParticipantInformation,
        description="Participant details section.",
    )
    contribution_information: ContributionInformation = Field(
        default_factory=ContributionInformation,
        description="Contribution fields from relevant boxes.",
    )
    ira_type_checkboxes: IRATypeCheckboxes = Field(
        default_factory=IRATypeCheckboxes,
        description="IRA type checkbox states.",
    )
    rmd_information: RMDInformation = Field(
        default_factory=RMDInformation,
        description="RMD information from boxes 11/12.",
    )


class Form5498Details(BaseModel):
    ira_contribution_5498: List[IRAContribution5498Entry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 5498 entries.",
    )
