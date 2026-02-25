import { ExtractedPayload } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.trim() ?? '';
const EXTRACT_ENDPOINT = '/documents/extract';

function buildExtractUrl(): string {
  if (!API_BASE_URL) {
    return EXTRACT_ENDPOINT;
  }
  const normalizedBase = API_BASE_URL.replace(/\/+$/, '');
  return `${normalizedBase}${EXTRACT_ENDPOINT}`;
}

export interface ExtractRequest {
  type: string;
  files: File[];
}

export async function extractDocuments({ type, files }: ExtractRequest): Promise<ExtractedPayload> {
  const formData = new FormData();
  formData.append('type', type);
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(buildExtractUrl(), {
    method: 'POST',
    body: formData,
  });

  const payload = (await response.json()) as ExtractedPayload | { detail?: string };

  if (!response.ok) {
    const detail =
      typeof payload === 'object' &&
      payload !== null &&
      'detail' in payload &&
      typeof payload.detail === 'string'
        ? payload.detail
        : `Extraction request failed with status ${response.status}.`;
    throw new Error(detail);
  }

  return payload as ExtractedPayload;
}
