from typing import List

from pydantic import BaseModel, Field


class BrokerInformation(BaseModel):
    brokerage_account_name: str = Field(default="", description="Brokerage account name.")
    ein_of_broker: str = Field(default="", description="Broker EIN as printed.")
    address_of_broker: str = Field(default="", description="Broker street address.")
    city_of_broker: str = Field(default="", description="Broker city.")
    state_of_broker: str = Field(default="", description="Broker state abbreviation.")
    zip_code_of_broker: str = Field(default="", description="Broker ZIP/postal code.")


class TaxpayerInformation(BaseModel):
    taxpayer_name: str = Field(default="", description="Taxpayer full name.")
    taxpayer_id_number: str = Field(default="", description="Taxpayer SSN/TIN (masked or full).")
    taxpayer_address: str = Field(default="", description="Taxpayer street address.")
    taxpayer_city: str = Field(default="", description="Taxpayer city.")
    taxpayer_state: str = Field(default="", description="Taxpayer state abbreviation.")
    taxpayer_zip_code: str = Field(default="", description="Taxpayer ZIP/postal code.")


class GainLossSection(BaseModel):
    total_proceeds: float = Field(default=0, description="Total proceeds for the section.")
    total_cost_basis: float = Field(default=0, description="Total cost basis for the section.")
    total_market_discount: float = Field(default=0, description="Total market discount for the section.")
    total_wash_sales: float = Field(default=0, description="Total wash sale adjustments for the section.")
    realized_gain_loss: float = Field(default=0, description="Realized gain/loss total for the section.")
    federal_income_tax_withheld: float = Field(
        default=0,
        description="Federal income tax withheld for the section.",
    )


class Sale1099BEntry(BaseModel):
    broker_information: BrokerInformation = Field(
        default_factory=BrokerInformation,
        description="Broker details section.",
    )
    taxpayer_information: TaxpayerInformation = Field(
        default_factory=TaxpayerInformation,
        description="Taxpayer details section.",
    )
    short_term_basis_reported_to_irs: GainLossSection = Field(
        default_factory=GainLossSection,
        description="Short-term transactions with basis reported to IRS.",
    )
    short_term_basis_not_reported_to_irs: GainLossSection = Field(
        default_factory=GainLossSection,
        description="Short-term transactions with basis not reported to IRS.",
    )
    long_term_basis_reported_to_irs: GainLossSection = Field(
        default_factory=GainLossSection,
        description="Long-term transactions with basis reported to IRS.",
    )
    long_term_basis_not_reported_to_irs: GainLossSection = Field(
        default_factory=GainLossSection,
        description="Long-term transactions with basis not reported to IRS.",
    )
    basis_not_reported_term_unknown: GainLossSection = Field(
        default_factory=GainLossSection,
        description="Transactions where basis not reported and term is unknown.",
    )


class ConsolidatedBrokerageStatementDetails(BaseModel):
    sale_1099B: List[Sale1099BEntry] = Field(
        default_factory=list,
        description="List of extracted 1099-B sale summary sections.",
    )
