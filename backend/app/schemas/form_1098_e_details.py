from typing import List

from pydantic import BaseModel, Field


class RecipientInformation(BaseModel):
    recipient_name: str = Field(default="", description="Lender or recipient name.")
    recipient_address: str = Field(default="", description="Recipient street or mailing address.")
    recipient_city: str = Field(default="", description="Recipient city.")
    recipient_state: str = Field(default="", description="Recipient state.")
    recipient_zip_code: str = Field(default="", description="Recipient ZIP code.")
    recipient_phone_number: str = Field(default="", description="Recipient phone number.")
    recipient_tin: str = Field(default="", description="Recipient taxpayer identification number.")


class BorrowerInformation(BaseModel):
    borrower_tin: str = Field(default="", description="Borrower taxpayer identification number.")
    borrower_name: str = Field(default="", description="Borrower full name.")
    borrower_street_address: str = Field(default="", description="Borrower street address.")
    borrower_city: str = Field(default="", description="Borrower city.")
    borrower_state: str = Field(default="", description="Borrower state.")
    borrower_zip_code: str = Field(default="", description="Borrower ZIP code.")


class LoanInformation(BaseModel):
    account_number: str = Field(default="", description="Borrower account number.")
    student_loan_interest_received: float | int = Field(
        default=0,
        description="Student loan interest received in this tax year.",
    )
    loan_origination_fees_checkbox: bool = Field(
        default=False,
        description="Whether loan origination fees were included in interest amount.",
    )


class StudentExpenses1098EEntry(BaseModel):
    recipient_information: RecipientInformation = Field(
        default_factory=RecipientInformation,
        description="Recipient/lender details from Form 1098-E.",
    )
    borrower_information: BorrowerInformation = Field(
        default_factory=BorrowerInformation,
        description="Borrower details from Form 1098-E.",
    )
    loan_information: LoanInformation = Field(
        default_factory=LoanInformation,
        description="Loan-related details from Form 1098-E.",
    )


class Form1098EDetails(BaseModel):
    student_expenses_1098E: List[StudentExpenses1098EEntry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 1098-E entries.",
    )
