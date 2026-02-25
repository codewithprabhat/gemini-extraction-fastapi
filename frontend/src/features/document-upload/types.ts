export interface QueuedFile {
  id: string;
  file: File;
  status: 'ready' | 'processing' | 'extracted' | 'error';
}

export interface RequestUsage {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
}

export interface ExtractedPayload {
  request_usage?: RequestUsage;
  confidence_score?: number;
  [key: string]: unknown;
}
