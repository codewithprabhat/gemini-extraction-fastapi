import { Box, Button, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';
import { ExtractedPayload } from '../types';
import UploadBottomActions from './UploadBottomActions';

interface ExtractionResultPanelProps {
  isExtracting: boolean;
  canExtract: boolean;
  resultJson: ExtractedPayload | null;
  errorMessage: string | null;
  confidencePercent: number | null;
  totalCostUsd: number | null;
  copied: boolean;
  onExtract: () => void;
  onCopy: () => void;
  onExport: () => void;
}

function ExtractionResultPanel({
  isExtracting,
  canExtract,
  resultJson,
  errorMessage,
  confidencePercent,
  totalCostUsd,
  copied,
  onExtract,
  onCopy,
  onExport,
}: ExtractionResultPanelProps) {
  const hasResult = Boolean(resultJson);
  const formattedCost = typeof totalCostUsd === 'number' ? totalCostUsd.toFixed(6) : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 560, height: '100%', bgcolor: appColors.bgDeep }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2.5, py: 1.75, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Typography sx={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: appColors.textSecondary }}>
          Extraction Engine
        </Typography>
        <Stack direction="row" spacing={0.75} alignItems="center">
          {hasResult && formattedCost && (
            <Box
              sx={{
                px: 1.1,
                py: 0.35,
                borderRadius: 99,
                color: appColors.goldLight,
                fontSize: 10,
                border: `1px solid ${appColors.border}`,
                backgroundColor: 'rgba(201,168,76,0.12)',
                fontFamily: "'Fira Code', monospace",
              }}
            >
              Cost: ${formattedCost}
            </Box>
          )}
          <Box
            sx={{
              px: 1.1,
              py: 0.35,
              borderRadius: 99,
              color: '#6BA4E8',
              fontSize: 10,
              border: '1px solid rgba(59,125,216,0.2)',
              backgroundColor: 'rgba(59,125,216,0.1)',
              fontFamily: "'Fira Code', monospace",
            }}
          >
            AI Ready
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(0,0,0,0.2)' }}>
        <Button
          disabled={!canExtract || isExtracting}
          onClick={onExtract}
          sx={{
            flex: 1,
            textTransform: 'none',
            color: '#000',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${appColors.goldLight} 0%, ${appColors.gold} 50%, #9A6E28 100%)`,
            '&.Mui-disabled': { opacity: 0.35, color: '#000' },
          }}
        >
          {isExtracting ? 'Analyzing…' : hasResult ? 'Re-extract' : 'Extract Data'}
        </Button>
        <Button sx={{ minWidth: 46, color: appColors.textSecondary, border: '1px solid rgba(255,255,255,0.07)' }}>
          ⚙
        </Button>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, maxHeight: '65vh', display: 'flex', flexDirection: 'column' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, py: 1.1, borderBottom: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(0,0,0,0.2)' }}
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box sx={{ px: 1, py: 0.3, borderRadius: 1, color: '#6BA4E8', fontSize: 10, border: '1px solid rgba(59,125,216,0.25)', backgroundColor: 'rgba(59,125,216,0.12)', fontFamily: "'Fira Code', monospace" }}>
              application/json
            </Box>
            {hasResult && (
              <Typography sx={{ fontSize: 11, color: appColors.accentTeal }}>
                Extracted {confidencePercent ? `· ${confidencePercent}% confidence` : ''}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={0.75}>
            <Button
              disabled={!hasResult}
              onClick={onCopy}
              sx={{
                textTransform: 'none',
                fontSize: 11,
                color: copied ? appColors.accentTeal : appColors.textMuted,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {copied ? 'Copied!' : 'Copy JSON'}
            </Button>
            <Button disabled={!hasResult} sx={{ textTransform: 'none', fontSize: 11, color: appColors.textMuted, border: '1px solid rgba(255,255,255,0.06)' }}>
              Expand
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            p: 2.25,
            overflow: 'auto',
            bgcolor: '#080808',
            fontFamily: "'Fira Code', monospace",
            fontSize: 12,
          }}
        >
          {!hasResult && !isExtracting && (
            <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ height: '100%', color: appColors.textMuted, textAlign: 'center' }}>
              <Typography sx={{ fontSize: 13 }}>
                Upload documents and click Extract Data to generate JSON.
              </Typography>
              {errorMessage && (
                <Typography sx={{ fontSize: 12, color: '#F87171', maxWidth: 420 }}>
                  {errorMessage}
                </Typography>
              )}
            </Stack>
          )}

          {isExtracting && (
            <Stack spacing={1.1}>
              {Array.from({ length: 14 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    height: 12,
                    borderRadius: 0.75,
                    width: `${[60, 80, 90, 50, 70, 85, 55, 75, 45, 80, 90, 65, 70, 50][index]}%`,
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.4s infinite',
                  }}
                />
              ))}
            </Stack>
          )}

          {hasResult && (
            <pre
              style={{
                margin: 0,
                color: '#A1A1AA',
                lineHeight: 1.8,
                whiteSpace: 'pre',
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(resultJson, null, 2)}
            </pre>
          )}
        </Box>
      </Box>

      {hasResult && confidencePercent !== null && (
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ px: 2, py: 1.2, borderTop: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(0,0,0,0.2)' }}>
          <Typography sx={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: appColors.textMuted }}>
            Confidence
          </Typography>
          <Box sx={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <Box
              sx={{
                height: '100%',
                width: `${confidencePercent}%`,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${appColors.gold}, ${appColors.accentTeal})`,
                transition: 'width 1s ease',
              }}
            />
          </Box>
          <Typography sx={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: appColors.accentTeal }}>
            {confidencePercent}%
          </Typography>
        </Stack>
      )}

      <UploadBottomActions
        disabled={!hasResult}
        onExportJson={onExport}
        onCopyJson={onCopy}
      />
    </Box>
  );
}

export default ExtractionResultPanel;
