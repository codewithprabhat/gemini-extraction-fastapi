from typing import List, Literal

from pydantic import BaseModel, Field


class EmployeeDetails(BaseModel):
    employeeName: str = Field(default="", description="Full employee name.")
    employeeAddress: str = Field(default="", description="Address of the employee.")
    employeeCity: str = Field(default="", description="City of the employee.")
    employeeState: str = Field(default="", description="State of the employee.")
    employeeZipCode: str = Field(default="", description="Zip code of the employee.")
    employeeSocialSecurityNumber: str = Field(default="", description="Employee's Social Security Number.")


class EmployerDetails(BaseModel):
    employerName: str = Field(default="", description="Full name of the employer.")
    employerAddress: str = Field(default="", description="Address of the employer.")
    employerCity: str = Field(default="", description="City of the employer.")
    employerState: str = Field(default="", description="State of the employer.")
    employerZipCode: str = Field(default="", description="Employer zip code.")
    employerIdentificationNumber: str = Field(default="", description="Employer's EIN.")


class Box13Checkboxes(BaseModel):
    statutoryEmployee: bool = Field(default=False, description="Statutory employee checkbox.")
    retirementPlan: bool = Field(default=False, description="Retirement plan checkbox.")
    thirdPartySickPay: bool = Field(default=False, description="Third-party sick pay checkbox.")


class CodeAmountEntry(BaseModel):
    code: str = Field(default="", description="Code value.")
    amount: float = Field(default=0, description="Monetary amount.")


class StateTaxInformationEntry(BaseModel):
    state: str = Field(default="", description="State abbreviation.")
    stateEmployerId: str = Field(default="", description="State employer identifier.")
    stateWagesTips: float = Field(default=0, description="State wages, tips, etc.")
    stateIncomeTax: float = Field(default=0, description="State income tax withheld.")


class LocalTaxInformationEntry(BaseModel):
    localityName: str = Field(default="", description="Locality name or code.")
    localWagesTips: float = Field(default=0, description="Local wages, tips, etc.")
    localIncomeTax: float = Field(default=0, description="Local income tax withheld.")


class W2Form(BaseModel):
    formType: Literal["W-2"] = Field(default="W-2", description="Type of tax form.")
    employeeDetails: EmployeeDetails = Field(default_factory=EmployeeDetails, description="Details of the employee.")
    employerDetails: EmployerDetails = Field(default_factory=EmployerDetails, description="Details of the employer.")
    wagesTipsOtherCompensation: float = Field(default=0, description="Total wages, tips, and other compensation.")
    federalIncomeTaxWithheld: float = Field(default=0, description="Federal income tax withheld.")
    socialSecurityWages: float = Field(default=0, description="Social Security wages.")
    socialSecurityTaxWithheld: float = Field(default=0, description="Social Security tax withheld.")
    medicareWagesAndTips: float = Field(default=0, description="Medicare wages and tips.")
    medicareTaxWithheld: float = Field(default=0, description="Medicare tax withheld.")
    socialSecurityTips: float = Field(default=0, description="Social Security tips.")
    allocatedTips: float = Field(default=0, description="Allocated tips.")
    verificationCode: str = Field(default="", description="Verification code from box 9, if present.")
    dependentCareBenefits: float = Field(default=0, description="Dependent care benefits.")
    nonqualifiedPlans: float = Field(default=0, description="Nonqualified plans.")
    box13Checkboxes: Box13Checkboxes = Field(default_factory=Box13Checkboxes, description="Box 13 checkboxes.")
    box14Other: List[CodeAmountEntry] = Field(default_factory=list, description="Box 14 code/amount pairs.")
    stateTaxInformation: List[StateTaxInformationEntry] = Field(
        default_factory=list,
        description="State tax information entries.",
    )
    localTaxInformation: List[LocalTaxInformationEntry] = Field(
        default_factory=list,
        description="Local tax information entries.",
    )
    box12a: List[CodeAmountEntry] = Field(default_factory=list, description="Box 12a code/amount entries.")
    box12b: List[CodeAmountEntry] = Field(default_factory=list, description="Box 12b code/amount entries.")
    box12c: List[CodeAmountEntry] = Field(default_factory=list, description="Box 12c code/amount entries.")
    box12d: List[CodeAmountEntry] = Field(default_factory=list, description="Box 12d code/amount entries.")


class W2Details(BaseModel):
    w2Forms: List[W2Form] = Field(default_factory=list, description="List of W-2 forms found in the document.")
