from typing import List

from pydantic import BaseModel, Field

from app.schemas.form_1098_e_details import StudentExpenses1098EEntry
from app.schemas.form_1098_t_details import TuitionExpenses1098TEntry


class LenderInformation(BaseModel):
    lender_name: str = Field(default="", description="Lender name as shown on Form 1098.")
    lender_address: str = Field(default="", description="Lender mailing address.")
    lender_phone_number: str = Field(default="", description="Lender phone number.")
    lender_tin: str = Field(default="", description="Lender taxpayer identification number.")


class BorrowerInformation(BaseModel):
    borrower_tin: str = Field(default="", description="Borrower taxpayer identification number.")
    borrower_name: str = Field(default="", description="Borrower full name.")
    borrower_street_address: str = Field(default="", description="Borrower street address.")
    borrower_city_town_zip: str = Field(default="", description="Borrower city/town/state/ZIP composite value.")


class MortgageInformation(BaseModel):
    mortgage_interest_received: float | int = Field(default=0, description="Mortgage interest received from borrower.")
    outstanding_mortgage_principal: float | int = Field(
        default=0,
        description="Outstanding mortgage principal.",
    )
    mortgage_origination_date: str = Field(default="", description="Mortgage origination date in YYYY-MM-DD format when visible.")
    refund_of_overpaid_interest: float | int = Field(default=0, description="Refund of overpaid interest.")
    mortgage_insurance_premiums: float | int = Field(default=0, description="Mortgage insurance premiums.")
    points_paid_on_principal: float | int = Field(default=0, description="Points paid on purchase of principal residence.")
    address_securing_same: bool = Field(
        default=False,
        description="Whether address of property securing mortgage is same as payer/borrower address.",
    )
    address_or_description_of_property_securing_mortgage: str = Field(
        default="",
        description="Address or legal description of property securing mortgage.",
    )
    number_of_properties_securing_mortgage: float | int = Field(default=0, description="Number of properties securing mortgage.")
    other_or_real_estate_taxes: float | int = Field(default=0, description="Other amount including real estate taxes.")
    mortgage_acquisition_date: str = Field(default="", description="Mortgage acquisition date if shown.")


class MortgageExpenses1098Entry(BaseModel):
    lender_information: LenderInformation = Field(
        default_factory=LenderInformation,
        description="Lender details from Form 1098.",
    )
    borrower_information: BorrowerInformation = Field(
        default_factory=BorrowerInformation,
        description="Borrower details from Form 1098.",
    )
    mortgage_information: MortgageInformation = Field(
        default_factory=MortgageInformation,
        description="Mortgage details from Form 1098.",
    )
    account_number: str = Field(default="", description="Account number from Form 1098.")
    calendar_year: str = Field(default="", description="Calendar year shown on Form 1098.")
    created_at: str = Field(default="", description="Optional created-at metadata when present in source.")


class Form1098Details(BaseModel):
    mortgage_expenses_1098: List[MortgageExpenses1098Entry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 1098 mortgage entries.",
    )
    student_expenses_1098E: List[StudentExpenses1098EEntry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 1098-E entries.",
    )
    tuition_expenses_1098T: List[TuitionExpenses1098TEntry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 1098-T entries.",
    )
