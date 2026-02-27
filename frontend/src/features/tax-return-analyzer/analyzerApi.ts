const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.trim() ?? '';
const PROCESS_TEXT_RETURN_ENDPOINT = '/documents/process-text-return';

function buildProcessTextReturnUrl(): string {
  if (!API_BASE_URL) {
    return PROCESS_TEXT_RETURN_ENDPOINT;
  }
  const normalizedBase = API_BASE_URL.replace(/\/+$/, '');
  return `${normalizedBase}${PROCESS_TEXT_RETURN_ENDPOINT}`;
}

export interface UsageDetails {
  input_tokens?: number | null;
  output_tokens?: number | null;
  total_tokens?: number | null;
}

export interface ProcessTextReturnResponse {
  type: string;
  prompt: string;
  model: string;
  processing_status: 'SUCCESS' | 'PROCESSING_FAILED' | string;
  result_text?: string | null;
  usage: UsageDetails;
  error_message?: string | null;
}

interface AnalyzeTaxReturnRequest {
  prompt: string;
  file: File;
}

export async function analyzeTaxReturn({
  prompt,
  file,
}: AnalyzeTaxReturnRequest): Promise<ProcessTextReturnResponse> {
  const formData = new FormData();
  formData.append('prompt', prompt);
  formData.append('file', file);

  const response = await fetch(buildProcessTextReturnUrl(), {
    method: 'POST',
    body: formData,
  });

  const payload = (await response.json()) as ProcessTextReturnResponse | { detail?: string };
  if (!response.ok) {
    const detail =
      typeof payload === 'object' &&
      payload !== null &&
      'detail' in payload &&
      typeof payload.detail === 'string'
        ? payload.detail
        : `Tax return analysis failed with status ${response.status}.`;
    throw new Error(detail);
  }

  return payload as ProcessTextReturnResponse;
}
