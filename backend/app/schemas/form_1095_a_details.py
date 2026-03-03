from typing import List

from pydantic import BaseModel, Field


class PolicyInformation(BaseModel):
    marketplace_identifier: str = Field(default="", description="Marketplace identifier as shown on the form.")
    policy_number: str = Field(default="", description="Policy number.")
    policy_issuer_name: str = Field(default="", description="Policy issuer name.")
    policy_start_date: str = Field(default="", description="Policy start date.")
    policy_termination_date: str = Field(default="", description="Policy termination date.")


class RecipientInformation(BaseModel):
    recipient_first_name: str = Field(default="", description="Recipient first name.")
    recipient_last_name: str = Field(default="", description="Recipient last name.")
    recipient_ssn: str = Field(default="", description="Recipient SSN as displayed (including masked values).")
    recipient_date_of_birth: str = Field(default="", description="Recipient date of birth.")
    recipient_spouse_name: str = Field(default="", description="Recipient spouse full name.")
    recipient_spouse_ssn: str = Field(default="", description="Recipient spouse SSN as displayed.")
    recipient_spouse_date_of_birth: str = Field(default="", description="Recipient spouse date of birth.")
    street_address: str = Field(default="", description="Street address.")
    city: str = Field(default="", description="City.")
    state: str = Field(default="", description="State.")
    zip_code: str = Field(default="", description="ZIP code.")


class CoveredIndividual(BaseModel):
    individual_first_name: str = Field(default="", description="Covered individual first name.")
    individual_last_name: str = Field(default="", description="Covered individual last name.")
    coverage_start_date: str = Field(default="", description="Coverage start date.")
    coverage_termination_date: str = Field(default="", description="Coverage termination date.")
    covered_individual_ssn: str = Field(default="", description="Covered individual SSN as displayed.")
    covered_individual_dob: str = Field(default="", description="Covered individual date of birth.")


class MonthlyFinancialDetails(BaseModel):
    january_slcsp: float | int = Field(default=0, description="January SLCSP amount.")
    january_aptc: float | int = Field(default=0, description="January APTC amount.")
    january_enrollment_premiums: float | int = Field(default=0, description="January enrollment premiums.")
    february_slcsp: float | int = Field(default=0, description="February SLCSP amount.")
    february_aptc: float | int = Field(default=0, description="February APTC amount.")
    february_enrollment_premiums: float | int = Field(default=0, description="February enrollment premiums.")
    march_slcsp: float | int = Field(default=0, description="March SLCSP amount.")
    march_aptc: float | int = Field(default=0, description="March APTC amount.")
    march_enrollment_premiums: float | int = Field(default=0, description="March enrollment premiums.")
    april_slcsp: float | int = Field(default=0, description="April SLCSP amount.")
    april_aptc: float | int = Field(default=0, description="April APTC amount.")
    april_enrollment_premiums: float | int = Field(default=0, description="April enrollment premiums.")
    may_slcsp: float | int = Field(default=0, description="May SLCSP amount.")
    may_aptc: float | int = Field(default=0, description="May APTC amount.")
    may_enrollment_premiums: float | int = Field(default=0, description="May enrollment premiums.")
    june_slcsp: float | int = Field(default=0, description="June SLCSP amount.")
    june_aptc: float | int = Field(default=0, description="June APTC amount.")
    june_enrollment_premiums: float | int = Field(default=0, description="June enrollment premiums.")
    july_slcsp: float | int = Field(default=0, description="July SLCSP amount.")
    july_aptc: float | int = Field(default=0, description="July APTC amount.")
    july_enrollment_premiums: float | int = Field(default=0, description="July enrollment premiums.")
    august_slcsp: float | int = Field(default=0, description="August SLCSP amount.")
    august_aptc: float | int = Field(default=0, description="August APTC amount.")
    august_enrollment_premiums: float | int = Field(default=0, description="August enrollment premiums.")
    september_slcsp: float | int = Field(default=0, description="September SLCSP amount.")
    september_aptc: float | int = Field(default=0, description="September APTC amount.")
    september_enrollment_premiums: float | int = Field(default=0, description="September enrollment premiums.")
    october_slcsp: float | int = Field(default=0, description="October SLCSP amount.")
    october_aptc: float | int = Field(default=0, description="October APTC amount.")
    october_enrollment_premiums: float | int = Field(default=0, description="October enrollment premiums.")
    november_slcsp: float | int = Field(default=0, description="November SLCSP amount.")
    november_aptc: float | int = Field(default=0, description="November APTC amount.")
    november_enrollment_premiums: float | int = Field(default=0, description="November enrollment premiums.")
    december_slcsp: float | int = Field(default=0, description="December SLCSP amount.")
    december_aptc: float | int = Field(default=0, description="December APTC amount.")
    december_enrollment_premiums: float | int = Field(default=0, description="December enrollment premiums.")


class AnnualTotals(BaseModel):
    total_monthly_enrolled_premiums: float | int = Field(default=0, description="Annual total of monthly enrollment premiums.")
    total_second_lowest_cost_silver_plan: float | int = Field(default=0, description="Annual total second lowest cost silver plan.")
    total_advance_payment_of_premium_tax_credit: float | int = Field(
        default=0,
        description="Annual total advance payment of premium tax credit.",
    )


class HealthIRS1095AEntry(BaseModel):
    policy_information: PolicyInformation = Field(
        default_factory=PolicyInformation,
        description="Policy details extracted from Form 1095-A.",
    )
    recipient_information: RecipientInformation = Field(
        default_factory=RecipientInformation,
        description="Recipient details extracted from Form 1095-A.",
    )
    covered_individuals: List[CoveredIndividual] = Field(
        default_factory=list,
        description="Covered individuals listed on Form 1095-A.",
    )
    monthly_financial_details: MonthlyFinancialDetails = Field(
        default_factory=MonthlyFinancialDetails,
        description="Month-wise premium and credit values.",
    )
    annual_totals: AnnualTotals = Field(
        default_factory=AnnualTotals,
        description="Annual totals section values.",
    )


class Form1095ADetails(BaseModel):
    health_IRS_1095A: List[HealthIRS1095AEntry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 1095-A entries.",
    )
