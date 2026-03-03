from typing import List

from pydantic import BaseModel, Field


class PayerInformation(BaseModel):
    payer_name: str = Field(default="", description="Payer name as printed on Form 1099-G.")
    payer_street_address: str = Field(default="", description="Payer street mailing address.")
    payer_city: str = Field(default="", description="Payer city.")
    payer_state: str = Field(default="", description="Payer state abbreviation.")
    payer_zip_code: str = Field(default="", description="Payer ZIP/postal code.")
    payer_tin: str = Field(default="", description="Payer TIN.")


class RecipientInformation(BaseModel):
    recipient_name: str = Field(default="", description="Recipient name.")
    recipient_street_address: str = Field(default="", description="Recipient street mailing address.")
    recipient_city: str = Field(default="", description="Recipient city.")
    recipient_state: str = Field(default="", description="Recipient state abbreviation.")
    recipient_zip_code: str = Field(default="", description="Recipient ZIP/postal code.")
    recipient_tin: str = Field(default="", description="Recipient TIN/SSN as shown.")


class PaymentDetails(BaseModel):
    account_number: str = Field(default="", description="Payer account number, if present.")
    unemployment_compensation: float = Field(default=0, description="Box 1 unemployment compensation.")
    state_local_refunds: float = Field(default=0, description="Box 2 state or local income tax refunds.")
    tax_year_for_refund: int = Field(default=0, description="Box 3 tax year for the state/local refund.")
    federal_income_tax_withheld: float = Field(default=0, description="Box 4 federal income tax withheld.")
    rtaa_payments: float = Field(default=0, description="Box 5 RTAA payments.")
    taxable_grants: float = Field(default=0, description="Box 6 taxable grants.")
    agricultural_payments: float = Field(default=0, description="Box 7 agriculture payments.")
    trade_or_business_income_checkbox: bool = Field(
        default=False,
        description="Box 8 checkbox indicating trade or business income.",
    )
    market_gain: float = Field(default=0, description="Box 9 market gain.")
    state_code: str = Field(default="", description="Box 10a state code.")
    state_id_no: str = Field(default="", description="Box 10b state identification number.")
    state_tax_withheld: float = Field(default=0, description="Box 11 state tax withheld.")


class Unemployment1099GEntry(BaseModel):
    payer_information: PayerInformation = Field(
        default_factory=PayerInformation,
        description="Payer details section.",
    )
    recipient_information: RecipientInformation = Field(
        default_factory=RecipientInformation,
        description="Recipient details section.",
    )
    payment_details: PaymentDetails = Field(
        default_factory=PaymentDetails,
        description="Form 1099-G payment and tax fields.",
    )


class Form1099GDetails(BaseModel):
    unemployment_1099G: List[Unemployment1099GEntry] = Field(
        default_factory=list,
        description="List of extracted unemployment Form 1099-G entries.",
    )
