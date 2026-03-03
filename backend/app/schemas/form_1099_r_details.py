from typing import List

from pydantic import BaseModel, Field


class PayerInformation1099R(BaseModel):
    payer_name: str = Field(default="", description="Payer name from Form 1099-R.")
    payer_address: str = Field(default="", description="Payer mailing address line.")
    payer_city: str = Field(default="", description="Payer city.")
    payer_state_province: str = Field(default="", description="Payer state or province.")
    payer_zip_code: str = Field(default="", description="Payer ZIP or postal code.")
    payer_telephone_number: str = Field(default="", description="Payer phone number.")
    payer_tin: str = Field(default="", description="Payer tax identification number.")


class RecipientInformation1099R(BaseModel):
    recipient_tin: str = Field(default="", description="Recipient TIN/SSN as shown on the form.")
    recipient_name: str = Field(default="", description="Recipient full name.")
    recipient_street_address: str = Field(default="", description="Recipient street address.")
    recipient_city: str = Field(default="", description="Recipient city.")
    recipient_state: str = Field(default="", description="Recipient state.")
    recipient_zip_code: str = Field(default="", description="Recipient ZIP or postal code.")


class DistributionDetails1099R(BaseModel):
    account_number: str = Field(default="", description="Account number, if present.")
    gross_distribution: float = Field(default=0, description="Box 1 gross distribution.")
    taxable_amount: float = Field(default=0, description="Box 2a taxable amount.")
    taxable_amount_not_determined_checkbox: bool = Field(
        default=False,
        description="Box 2b taxable amount not determined checkbox.",
    )
    total_distribution_checkbox: bool = Field(default=False, description="Box 2b total distribution checkbox.")
    capital_gain: float = Field(default=0, description="Box 3 capital gain.")
    federal_income_tax_withheld: float = Field(default=0, description="Box 4 federal income tax withheld.")
    employee_contributions: float = Field(default=0, description="Box 5 employee contributions or insurance premiums.")
    net_unrealized_appreciation: float = Field(default=0, description="Box 6 net unrealized appreciation.")
    distribution_code_1: str = Field(default="", description="First distribution code from box 7.")
    distribution_code_2: str = Field(default="", description="Second distribution code from box 7, if present.")
    ira_sep_simple_checkbox: bool = Field(default=False, description="IRA/SEP/SIMPLE checkbox.")
    other_amount: float = Field(default=0, description="Box 8 other amount.")
    other_description: str = Field(default="", description="Description for other amount, if present.")
    your_percentage: float = Field(default=0, description="Box 9a your percentage of total distribution.")
    total_employee_contributions: float = Field(default=0, description="Box 9b total employee contributions.")
    amount_allocated_to_iras: float = Field(default=0, description="Box 10 amount allocated to IRAs.")
    first_year_of_designated_roth_contribution: str = Field(
        default="",
        description="Box 11 first year of designated Roth contribution.",
    )


class StateAndLocalTaxWithheld1099R(BaseModel):
    state_tax_withheld: float = Field(default=0, description="State tax withheld.")
    state_payer_state_no: str = Field(default="", description="State/payer state number value.")
    state_distribution: float = Field(default=0, description="State distribution amount.")
    local_tax_withheld: float = Field(default=0, description="Local tax withheld.")
    name_of_locality: str = Field(default="", description="Locality name.")
    local_distribution: float = Field(default=0, description="Local distribution amount.")


class Distribution1099REntry(BaseModel):
    payer_information: PayerInformation1099R = Field(
        default_factory=PayerInformation1099R,
        description="Payer section details.",
    )
    recipient_information: RecipientInformation1099R = Field(
        default_factory=RecipientInformation1099R,
        description="Recipient section details.",
    )
    distribution_details: DistributionDetails1099R = Field(
        default_factory=DistributionDetails1099R,
        description="Distribution, tax, and checkbox fields.",
    )
    state_and_local_tax_withheld: List[StateAndLocalTaxWithheld1099R] = Field(
        default_factory=list,
        description="State and local withholding entries (one or more lines).",
    )


class Form1099RDetails(BaseModel):
    distributions_1099R: List[Distribution1099REntry] = Field(
        default_factory=list,
        description="List of extracted Form 1099-R distribution entries.",
    )
