export type AnalyzerTab = 'analysis' | 'json' | 'insights';

export interface InsightItem {
  title: string;
  severity: 'ok' | 'warn' | 'info';
  body: string;
}

export interface AnalysisSection {
  title: string;
  body: string;
  fields?: Array<{ label: string; value: string }>;
}

export interface AnalysisResult {
  analysisTitle: string;
  sections: AnalysisSection[];
  rawText: string;
  confidence: number;
  tokens: number;
  inputCostUsd: number;
  outputCostUsd: number;
  totalCostUsd: number;
  processTimeSec: number;
  fieldsExtracted: number;
  sessionId: string;
  json: Record<string, unknown>;
  insights: InsightItem[];
}

const INPUT_COST_PER_MILLION_USD = 0.5;
const OUTPUT_COST_PER_MILLION_USD = 3.0;

export interface ProcessTextReturnUsage {
  input_tokens?: number | null;
  output_tokens?: number | null;
  total_tokens?: number | null;
}

export interface ProcessTextReturnPayload {
  type: string;
  prompt: string;
  model: string;
  processing_status: string;
  result_text?: string | null;
  usage?: ProcessTextReturnUsage;
  error_message?: string | null;
}

export const quickPrompts: Record<string, string> = {
  summary:
    'Provide a complete summary of this tax return, including AGI, taxable income, total tax, withholdings, and expected refund/balance due.',
  deductions:
    'Analyze deductions and identify which deductions look unusually high for the reported income.',
  errors:
    'Check for missing fields, inconsistent totals, and potential filing errors.',
  refund:
    'Estimate expected federal refund and explain the key drivers.',
};

export function mapProcessTextReturnToAnalysisResult(
  payload: ProcessTextReturnPayload,
  elapsedMs: number
): AnalysisResult {
  const rawText = (payload.result_text ?? '').trim();
  const sessionId = `anl_${Math.random().toString(36).slice(2, 10)}`;
  const usage = payload.usage ?? {};
  const totalTokens = typeof usage.total_tokens === 'number' ? usage.total_tokens : 0;
  const inputTokens = typeof usage.input_tokens === 'number' ? usage.input_tokens : 0;
  const outputTokens = typeof usage.output_tokens === 'number' ? usage.output_tokens : 0;
  const inputCostUsd = (inputTokens / 1_000_000) * INPUT_COST_PER_MILLION_USD;
  const outputCostUsd = (outputTokens / 1_000_000) * OUTPUT_COST_PER_MILLION_USD;
  const totalCostUsd = inputCostUsd + outputCostUsd;

  const sections: AnalysisSection[] = [
    {
      title: 'Request Metadata',
      body: `Model ${payload.model} processed this request with status ${payload.processing_status}.`,
      fields: [
        { label: 'Input Tokens', value: String(inputTokens) },
        { label: 'Output Tokens', value: String(outputTokens) },
        { label: 'Total Tokens', value: String(totalTokens) },
      ],
    },
  ];

  const confidence =
    payload.processing_status === 'SUCCESS' && rawText ? 95 : payload.processing_status === 'SUCCESS' ? 88 : 0;

  return {
    analysisTitle: 'Tax Return Analysis Summary',
    sections,
    rawText,
    confidence,
    tokens: totalTokens,
    inputCostUsd,
    outputCostUsd,
    totalCostUsd,
    processTimeSec: Number((elapsedMs / 1000).toFixed(1)),
    fieldsExtracted: rawText ? rawText.split(/\s+/).filter(Boolean).length : 0,
    sessionId,
    json: payload as unknown as Record<string, unknown>,
    insights: [
      {
        title: 'Processing Status',
        severity: payload.processing_status === 'SUCCESS' ? 'ok' : 'warn',
        body:
          payload.processing_status === 'SUCCESS'
            ? 'The API completed successfully and returned analysis text.'
            : `The API returned ${payload.processing_status}. ${
                payload.error_message ?? 'Please retry with a clearer prompt or another file.'
              }`,
      },
      {
        title: 'Token Usage',
        severity: totalTokens > 0 ? 'info' : 'warn',
        body:
          totalTokens > 0
            ? `Request consumed ${totalTokens} total tokens.`
            : 'No token usage details were returned by the API.',
      },
      {
        title: 'Model Used',
        severity: 'info',
        body: payload.model ? `Analysis ran on ${payload.model}.` : 'Model information was not returned.',
      },
    ],
  };
}
