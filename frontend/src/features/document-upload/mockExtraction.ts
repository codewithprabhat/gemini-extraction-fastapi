import { ExtractedPayload } from './types';

const predefinedByDocName: Record<string, ExtractedPayload> = {
  'W-2': {
    document_type: 'W-2',
    tax_year: 2024,
    employer: {
      ein: '12-3456789',
      name: 'Acme Corporation',
      address: '123 Main Street, Austin TX 78701',
    },
    employee: {
      ssn_last4: '****-**-7890',
      name: 'John K. Doe',
    },
    wages: {
      box_1_wages: 87450.0,
      box_2_federal_tax_withheld: 14832.0,
      box_12_codes: [{ code: 'D', amount: 4800.0 }],
      box_13_retirement_plan: true,
    },
    confidence_score: 0.97,
  },
  '1099-SA': {
    document_type: '1099-SA',
    tax_year: 2024,
    trustee: {
      tin: '98-7654321',
      name: 'HealthFirst Bank',
    },
    participant: {
      name: 'Jane M. Smith',
      ssn_last4: '****-**-4567',
    },
    distributions: {
      box_1_gross_distribution: 3200.0,
      box_3_distribution_code: '1',
      box_5_hsa_archer_msa: 'HSA',
    },
    confidence_score: 0.94,
  },
};

export function buildMockExtraction(documentName: string): ExtractedPayload {
  const existing = predefinedByDocName[documentName];
  if (existing) {
    return {
      ...existing,
      extraction_id: `ext_${Math.random().toString(36).slice(2, 12)}`,
      processed_at: new Date().toISOString(),
    };
  }

  return {
    document_type: documentName,
    tax_year: 2024,
    extracted_fields: {
      field_1: 'Value 1',
      field_2: 'Value 2',
      field_3: 12345.0,
    },
    confidence_score: 0.89,
    extraction_id: `ext_${Math.random().toString(36).slice(2, 12)}`,
    processed_at: new Date().toISOString(),
  };
}
