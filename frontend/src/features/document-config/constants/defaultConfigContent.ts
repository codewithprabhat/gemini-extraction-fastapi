export const DEFAULT_PROMPT = `You are an intelligent tax document parser specializing in IRS Form {{document_type}}.

Your task is to extract all relevant data fields from the provided document image or PDF with maximum precision.

## Instructions
1. Carefully examine every section of the {{document_type}} form.
2. Extract all filled-in values, including employer information, employee details, and all box amounts.
3. If a field is blank or unavailable, set its value to null.
4. For monetary values, always return numbers (not strings), rounded to 2 decimal places.
5. Return your response strictly as valid JSON matching the provided output schema.

## Context
File name: {{file_name}}
Tax year: {{tax_year}}
Employer: {{employer_name}}`;

export const DEFAULT_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "W2ExtractionResult",
  "type": "object",
  "required": ["document_type", "tax_year", "employer", "employee", "wages", "confidence_score"],
  "properties": {
    "document_type": { "type": "string" },
    "tax_year": { "type": "integer" },
    "document_type_mismatch": { "type": "boolean" },
    "employer": {
      "type": "object",
      "properties": {
        "ein": { "type": ["string", "null"] },
        "name": { "type": ["string", "null"] },
        "address": { "type": ["string", "null"] }
      }
    },
    "employee": {
      "type": "object",
      "properties": {
        "ssn_last4": { "type": ["string", "null"] },
        "name": { "type": ["string", "null"] },
        "address": { "type": ["string", "null"] }
      }
    },
    "wages": {
      "type": "object",
      "properties": {
        "box_1_wages": { "type": ["number", "null"] },
        "box_2_federal_tax_withheld": { "type": ["number", "null"] }
      }
    },
    "confidence_score": { "type": "number" }
  }
}`;
