import { Box, Button, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AnalysisResult, AnalyzerTab } from '../data/analysisModel';
import { appColors } from '../../../theme/tokens';

interface AnalyzerResultsPanelProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  errorMessage: string | null;
  activeTab: AnalyzerTab;
  onTabChange: (tab: AnalyzerTab) => void;
  onCopy: () => void;
  onExport: () => void;
}

function AnalyzerResultsPanel({
  isAnalyzing,
  result,
  errorMessage,
  activeTab,
  onTabChange,
  onCopy,
  onExport,
}: AnalyzerResultsPanelProps) {
  const formattedCost =
    result && Number.isFinite(result.totalCostUsd)
      ? `$${result.totalCostUsd.toFixed(result.totalCostUsd > 0 && result.totalCostUsd < 0.01 ? 6 : 4)}`
      : '—';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 620, bgcolor: appColors.bgDeep }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Stack direction="row" spacing={1.1} alignItems="center">
          <Typography sx={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: appColors.textSecondary }}>
            Analysis Results
          </Typography>
          <Typography sx={{ fontSize: 11, color: appColors.textMuted }}>
            Cost: <Box component="span" sx={{ color: appColors.goldLight }}>{formattedCost}</Box>
          </Typography>
        </Stack>
        <Chip
          size="small"
          label={isAnalyzing ? 'Analyzing' : result ? 'Complete' : 'Awaiting Input'}
          sx={{
            fontSize: 10,
            color: isAnalyzing ? appColors.gold : result ? appColors.accentTeal : appColors.textMuted,
            border: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(255,255,255,0.03)',
          }}
        />
      </Stack>

      {isAnalyzing && (
        <Box
          sx={{
            px: 2.5,
            py: 1,
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            bgcolor: 'rgba(201,168,76,0.08)',
          }}
        >
          <Typography sx={{ fontSize: 12, color: appColors.goldLight }}>
            It may take some minutes to get analysis result.
          </Typography>
        </Box>
      )}

      {result && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2.5, py: 1.2, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <Stack direction="row" spacing={1.2}>
            <Typography sx={{ fontSize: 11, color: appColors.textMuted }}>
              Confidence: <Box component="span" sx={{ color: appColors.accentTeal }}>{result.confidence}%</Box>
            </Typography>
            <Typography sx={{ fontSize: 11, color: appColors.textMuted }}>
              Tokens: <Box component="span" sx={{ color: appColors.goldLight }}>{result.tokens}</Box>
            </Typography>
            <Typography sx={{ fontSize: 11, color: appColors.textMuted }}>
              Time: <Box component="span" sx={{ color: appColors.textPrimary }}>{result.processTimeSec}s</Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.8}>
            <Button onClick={onCopy} size="small" sx={{ textTransform: 'none', color: appColors.textSecondary }}>
              Copy
            </Button>
            <Button onClick={onExport} size="small" sx={{ textTransform: 'none', color: appColors.gold }}>
              Export
            </Button>
          </Stack>
        </Stack>
      )}

      {result && (
        <Box sx={{ px: 1.5, pt: 1.2, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <Tabs
            value={activeTab}
            onChange={(_, value) => onTabChange(value)}
            sx={{ minHeight: 0, '& .MuiTabs-indicator': { display: 'none' } }}
          >
            {(['analysis', 'json', 'insights'] as AnalyzerTab[]).map((tab) => (
              <Tab
                key={tab}
                value={tab}
                label={tab === 'analysis' ? 'Analysis' : tab === 'json' ? 'JSON' : 'Insights'}
                sx={{
                  minHeight: 0,
                  py: 0.8,
                  textTransform: 'none',
                  color: appColors.textMuted,
                  '&.Mui-selected': {
                    color: appColors.gold,
                    bgcolor: 'rgba(201,168,76,0.08)',
                    borderRadius: 1.2,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      <Box sx={{ p: 2.5, flex: 1, overflowY: 'auto' }}>
        {errorMessage && (
          <Box
            sx={{
              mb: 1.5,
              p: 1.25,
              borderRadius: 1.2,
              border: '1px solid rgba(192,57,43,0.45)',
              bgcolor: 'rgba(192,57,43,0.12)',
            }}
          >
            <Typography sx={{ fontSize: 12.5, color: '#F5B0AA' }}>{errorMessage}</Typography>
          </Box>
        )}

        {!result && !isAnalyzing && (
          <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
            <Typography sx={{ fontSize: 14, color: appColors.textMuted }}>
              Upload a document and run analysis to view results.
            </Typography>
          </Box>
        )}

        {isAnalyzing && (
          <Box sx={{ display: 'grid', gap: 1.2 }}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Box
                key={`skel-${idx}`}
                sx={{
                  height: 12,
                  borderRadius: 1,
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.2s infinite',
                }}
              />
            ))}
          </Box>
        )}

        {result && !isAnalyzing && activeTab === 'analysis' && (
          <Box>
            <Typography
              sx={{
                mb: 1.5,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                color: appColors.goldLight,
              }}
            >
              {result.analysisTitle}
            </Typography>
            {result.rawText ? (
              <Typography
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 1.5,
                  border: '1px solid rgba(255,255,255,0.06)',
                  bgcolor: appColors.bgElevated,
                  fontSize: 13,
                  color: appColors.textSecondary,
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.75,
                }}
              >
                {result.rawText}
              </Typography>
            ) : null}
            {result.sections.map((section) => (
              <Box key={section.title} sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: appColors.textSecondary }}>
                  {section.title}
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: 13, color: appColors.textSecondary, lineHeight: 1.8 }}>
                  {section.body}
                </Typography>
                {section.fields?.map((field) => (
                  <Stack key={field.label} direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                    <Typography sx={{ fontSize: 12, color: appColors.textMuted }}>{field.label}</Typography>
                    <Typography sx={{ fontSize: 12, color: appColors.textPrimary }}>{field.value}</Typography>
                  </Stack>
                ))}
              </Box>
            ))}
          </Box>
        )}

        {result && !isAnalyzing && activeTab === 'json' && (
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 1.5,
              borderRadius: 1.5,
              border: '1px solid rgba(255,255,255,0.06)',
              bgcolor: '#080808',
              color: appColors.textPrimary,
              fontSize: 12,
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(result.json, null, 2)}
          </Box>
        )}

        {result && !isAnalyzing && activeTab === 'insights' && (
          <Stack gap={1.25}>
            {result.insights.map((item) => (
              <Box
                key={item.title}
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  border: '1px solid rgba(255,255,255,0.06)',
                  bgcolor: appColors.bgElevated,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: 13, color: appColors.textPrimary }}>{item.title}</Typography>
                  <Chip
                    size="small"
                    label={item.severity.toUpperCase()}
                    sx={{
                      fontSize: 10,
                      color:
                        item.severity === 'ok'
                          ? appColors.accentTeal
                          : item.severity === 'warn'
                            ? appColors.gold
                            : appColors.accentBlue,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  />
                </Stack>
                <Typography sx={{ mt: 0.75, fontSize: 12.5, color: appColors.textSecondary, lineHeight: 1.7 }}>
                  {item.body}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default AnalyzerResultsPanel;
