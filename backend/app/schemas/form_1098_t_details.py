from typing import List

from pydantic import BaseModel, Field


class FilerInformation(BaseModel):
    filer_name: str = Field(default="", description="Name of the filer institution.")
    filer_street_address: str = Field(default="", description="Street address of the filer.")
    filer_city: str = Field(default="", description="City of the filer.")
    filer_state: str = Field(default="", description="State of the filer.")
    filer_zip_code: str = Field(default="", description="ZIP code of the filer.")
    filer_telephone_number: str = Field(default="", description="Telephone number of the filer.")
    filer_ein: str = Field(default="", description="Employer Identification Number of the filer.")


class StudentInformation(BaseModel):
    student_tin: str = Field(default="", description="Student Taxpayer Identification Number.")
    student_first_name: str = Field(default="", description="Student first name.")
    student_last_name: str = Field(default="", description="Student last name.")
    student_street_address: str = Field(default="", description="Student street address.")
    student_city: str = Field(default="", description="Student city.")
    student_state: str = Field(default="", description="Student state.")
    student_zip_code: str = Field(default="", description="Student ZIP code.")


class TuitionAndFinancialDetails(BaseModel):
    service_provider_account_number: str = Field(default="", description="Service provider account number.")
    payments_received_for_qualified_tuition: float | int = Field(
        default=0,
        description="Payments received for qualified tuition and related expenses.",
    )
    adjustments_made_for_prior_year: float | int = Field(default=0, description="Adjustments made for a prior year.")
    scholarships_or_grants: float | int = Field(default=0, description="Scholarships or grants.")
    adjustments_to_scholarships_for_prior_year: float | int = Field(
        default=0,
        description="Adjustments to scholarships or grants for a prior year.",
    )
    academic_period_beginning_jan_march_checkbox: bool = Field(
        default=False,
        description="Whether an academic period begins in January through March.",
    )
    at_least_half_time_student_checkbox: bool = Field(
        default=False,
        description="Whether student was at least half-time.",
    )
    graduate_student_checkbox: bool = Field(default=False, description="Whether student was a graduate student.")
    ins_contract_reimb_refund: float | int = Field(default=0, description="Insurance contract reimbursement or refund.")


class TuitionExpenses1098TEntry(BaseModel):
    filer_information: FilerInformation = Field(
        default_factory=FilerInformation,
        description="Filer section details from Form 1098-T.",
    )
    student_information: StudentInformation = Field(
        default_factory=StudentInformation,
        description="Student section details from Form 1098-T.",
    )
    tuition_and_financial_details: TuitionAndFinancialDetails = Field(
        default_factory=TuitionAndFinancialDetails,
        description="Tuition and financial box details from Form 1098-T.",
    )


class Form1098TDetails(BaseModel):
    tuition_expenses_1098T: List[TuitionExpenses1098TEntry] = Field(
        default_factory=list,
        description="List of extracted IRS Form 1098-T entries.",
    )
