import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { quickPrompts } from '../data/analysisModel';
import { appColors } from '../../../theme/tokens';

interface AnalyzerUploadPanelProps {
  uploadedFile: File | null;
  prompt: string;
  isAnalyzing: boolean;
  onFileChange: (file: File | null) => void;
  onPromptChange: (value: string) => void;
  onRunAnalysis: () => void;
}

function AnalyzerUploadPanel({
  uploadedFile,
  prompt,
  isAnalyzing,
  onFileChange,
  onPromptChange,
  onRunAnalysis,
}: AnalyzerUploadPanelProps) {
  const words = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const chars = prompt.length;
  const canRun = Boolean(uploadedFile && prompt.trim()) && !isAnalyzing;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 620, bgcolor: appColors.bgVoid }}>
      <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Typography sx={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: appColors.textSecondary }}>
          Tax Document
        </Typography>
      </Box>

      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Button
          component="label"
          variant="outlined"
          fullWidth
          sx={{
            borderStyle: 'dashed',
            borderColor: appColors.borderBright,
            color: appColors.goldLight,
            py: 2.25,
            textTransform: 'none',
            '&:hover': { borderColor: appColors.gold, bgcolor: 'rgba(201,168,76,0.06)' },
          }}
        >
          {uploadedFile ? 'Change Tax Return File' : 'Upload Tax Return'}
          <input
            hidden
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.heic,.tiff"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
        </Button>

        {uploadedFile && (
          <Box
            sx={{
              mt: 1.5,
              p: 1.25,
              borderRadius: 1.5,
              border: '1px solid rgba(255,255,255,0.06)',
              bgcolor: appColors.bgElevated,
            }}
          >
            <Typography sx={{ fontSize: 13, color: appColors.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {uploadedFile.name}
            </Typography>
            <Typography sx={{ fontSize: 11, color: appColors.textMuted }}>
              {(uploadedFile.size / 1024).toFixed(0)} KB
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Typography sx={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: appColors.textSecondary }}>
          Analysis Prompt
        </Typography>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ p: 1.8, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {Object.entries(quickPrompts).map(([key, value]) => (
          <Chip
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            onClick={() => onPromptChange(value)}
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.05)',
              color: appColors.textSecondary,
              border: '1px solid rgba(255,255,255,0.06)',
              '&:hover': { bgcolor: 'rgba(201,168,76,0.08)', color: appColors.gold },
            }}
          />
        ))}
      </Stack>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, gap: 1.5 }}>
        <TextField
          multiline
          minRows={10}
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Describe what you want to analyze in this tax return..."
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              height: '100%',
              alignItems: 'flex-start',
              bgcolor: appColors.bgDeep,
              '& textarea': { color: appColors.textPrimary, lineHeight: 1.7 },
              '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
              '&:hover fieldset': { borderColor: appColors.borderBright },
              '&.Mui-focused fieldset': { borderColor: appColors.borderBright },
            },
          }}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontSize: 11, color: appColors.textMuted }}>
            Words: {words} | Chars: {chars}
          </Typography>
          <Button
            variant="contained"
            onClick={onRunAnalysis}
            disabled={!canRun}
            sx={{
              textTransform: 'none',
              color: '#000',
              background: `linear-gradient(135deg, ${appColors.goldLight} 0%, ${appColors.gold} 50%, ${appColors.goldDim} 100%)`,
            }}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Return'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default AnalyzerUploadPanel;
