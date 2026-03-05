from typing import List

from pydantic import BaseModel, Field


class HeaderInformation(BaseModel):
    is_void: bool = Field(default=False, description="Whether the 1099-DIV form is marked VOID.")
    is_corrected: bool = Field(default=False, description="Whether the 1099-DIV form is marked CORRECTED.")
    omb_no: str = Field(default="", description="OMB control number shown on form.")


class PayerInformation(BaseModel):
    payer_name: str = Field(default="", description="Name of payer.")
    payer_street_address: str = Field(default="", description="Payer street address.")
    payer_city_town_state_province_country_zip: str = Field(
        default="",
        description="Combined payer city/town, state/province, country, ZIP line.",
    )
    payer_tin: str = Field(default="", description="Payer TIN.")


class RecipientInformation(BaseModel):
    recipient_tin: str = Field(default="", description="Recipient TIN/SSN.")
    recipient_name: str = Field(default="", description="Recipient name.")
    recipient_street_address: str = Field(default="", description="Recipient street address.")
    recipient_city_town_state_province_zip: str = Field(
        default="",
        description="Combined recipient city/town, state/province, ZIP line.",
    )
    account_number: str = Field(default="", description="Account number shown on form.")


class DividendAndDistributionInformation(BaseModel):
    box_1a_total_ordinary_dividends: float = Field(default=0, description="Box 1a total ordinary dividends.")
    box_1b_qualified_dividends: float = Field(default=0, description="Box 1b qualified dividends.")
    box_2a_total_capital_gain_distr: float = Field(default=0, description="Box 2a total capital gain distributions.")
    box_2b_unrec_sec_1250_gain: float = Field(default=0, description="Box 2b unrecaptured section 1250 gain.")
    box_2c_section_1202_gain: float = Field(default=0, description="Box 2c section 1202 gain.")
    box_2d_collectibles_28_percent_gain: float = Field(
        default=0,
        description="Box 2d collectibles (28%) gain.",
    )
    box_2e_section_897_ordinary_dividends: float = Field(default=0, description="Box 2e section 897 ordinary dividends.")
    box_2f_section_897_capital_gain: float = Field(default=0, description="Box 2f section 897 capital gain.")
    box_3_nondividend_distributions: float = Field(default=0, description="Box 3 nondividend distributions.")
    box_4_federal_income_tax_withheld: float = Field(default=0, description="Box 4 federal income tax withheld.")
    box_5_section_199a_dividends: float = Field(default=0, description="Box 5 section 199A dividends.")
    box_6_investment_expenses: float = Field(default=0, description="Box 6 investment expenses.")
    box_7_foreign_tax_paid: float = Field(default=0, description="Box 7 foreign tax paid.")
    box_8_foreign_country_or_u_s_possession: str = Field(
        default="",
        description="Box 8 foreign country or U.S. possession.",
    )
    box_9_cash_liquidation_distributions: float = Field(default=0, description="Box 9 cash liquidation distributions.")
    box_10_noncash_liquidation_distributions: float = Field(default=0, description="Box 10 noncash liquidation distributions.")
    box_11_fatca_filing_requirement: bool = Field(default=False, description="Box 11 FATCA filing requirement checkbox.")
    box_12_exempt_interest_dividends: float = Field(default=0, description="Box 12 exempt-interest dividends.")
    box_13_specified_private_activity_bond_interest_dividends: float = Field(
        default=0,
        description="Box 13 specified private activity bond interest dividends.",
    )


class Box1416Entry(BaseModel):
    box_number: str = Field(default="", description="Box number among 14, 15, or 16.")
    description: str = Field(default="", description="Label/description for this box value.")
    amount: float = Field(default=0, description="Numeric amount if present, else 0.")
    value_text: str = Field(default="", description="Raw text value when not purely numeric.")


class Dividend1099DIV(BaseModel):
    header_information: HeaderInformation = Field(default_factory=HeaderInformation, description="1099-DIV header details.")
    payer_information: PayerInformation = Field(default_factory=PayerInformation, description="Payer information.")
    recipient_information: RecipientInformation = Field(default_factory=RecipientInformation, description="Recipient information.")
    dividend_and_distribution_information: DividendAndDistributionInformation = Field(
        default_factory=DividendAndDistributionInformation,
        description="Dividend and distribution boxes.",
    )
    box_14_16: List[Box1416Entry] = Field(
        default_factory=list,
        description="Structured entries for boxes 14-16.",
    )
    created_at: str = Field(default="", description="Document creation timestamp if present.")


class ResultEntry(BaseModel):
    dividend_1099DIV: Dividend1099DIV = Field(default_factory=Dividend1099DIV, description="One extracted 1099-DIV form block.")


class Form1099DivDetails(BaseModel):
    result: List[ResultEntry] = Field(default_factory=list, description="List of extracted 1099-DIV form results.")
