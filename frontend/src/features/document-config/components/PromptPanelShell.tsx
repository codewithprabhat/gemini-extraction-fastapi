import { Box, Button, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

interface PromptPanelShellProps {
  prompt: string;
}

function PromptPanelShell({ prompt }: PromptPanelShellProps) {
  const promptLines = prompt.split('\n').length;
  const tokenEstimate = Math.round(prompt.length / 4);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2.25,
          py: 1.4,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          backgroundColor: 'rgba(8,8,8,0.7)',
        }}
      >
        <Typography sx={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: appColors.textSecondary }}>
          Extraction Prompt
        </Typography>
        <Box
          sx={{
            px: 1,
            py: 0.3,
            borderRadius: 0.8,
            fontFamily: "'Fira Code', monospace",
            fontSize: 9,
            color: '#6BA4E8',
            border: '1px solid rgba(59,125,216,0.2)',
            backgroundColor: 'rgba(59,125,216,0.1)',
          }}
        >
          PROMPT
        </Box>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={0.8}
        sx={{ px: 2.25, py: 1, borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'rgba(0,0,0,0.15)' }}
      >
        <Typography sx={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: appColors.textMuted }}>
          Variables
        </Typography>
        {['{{document_type}}', '{{tax_year}}', '{{file_name}}'].map((item) => (
          <Box
            key={item}
            sx={{
              px: 1,
              py: 0.3,
              borderRadius: 99,
              fontSize: 10,
              fontFamily: "'Fira Code', monospace",
              color: '#7BAAF7',
              border: '1px solid rgba(59,125,216,0.2)',
              backgroundColor: 'rgba(59,125,216,0.08)',
            }}
          >
            {item}
          </Box>
        ))}
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <Box
          sx={{
            width: 44,
            py: 2.2,
            px: 1,
            borderRight: '1px solid rgba(255,255,255,0.03)',
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
        >
          {Array.from({ length: promptLines }, (_, index) => (
            <Typography
              key={index}
              sx={{
                textAlign: 'right',
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                lineHeight: 1.72,
                color: appColors.textMuted,
              }}
            >
              {index + 1}
            </Typography>
          ))}
        </Box>
        <Box
          component="textarea"
          value={prompt}
          readOnly
          sx={{
            flex: 1,
            py: 2.2,
            px: 2.5,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: appColors.textSecondary,
            fontSize: 13.5,
            lineHeight: 1.72,
            fontFamily: "'DM Sans', sans-serif",
            resize: 'none',
          }}
        />
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2.25,
          py: 1.2,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          backgroundColor: 'rgba(0,0,0,0.25)',
        }}
      >
        <Typography sx={{ fontSize: 10, color: appColors.textMuted }}>
          Lines: <Box component="span" sx={{ color: appColors.textSecondary, fontFamily: "'Fira Code', monospace" }}>{promptLines}</Box>
          {' · '}
          Tokens: <Box component="span" sx={{ color: appColors.textSecondary, fontFamily: "'Fira Code', monospace" }}>~{tokenEstimate}</Box>
        </Typography>
        <Button
          sx={{
            textTransform: 'none',
            fontSize: 11,
            color: appColors.gold,
            border: `1px solid ${appColors.border}`,
            backgroundColor: 'rgba(201,168,76,0.06)',
          }}
        >
          Edit Prompt
        </Button>
      </Stack>
    </Box>
  );
}

export default PromptPanelShell;
