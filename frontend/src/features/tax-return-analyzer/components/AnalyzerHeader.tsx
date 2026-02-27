import { Box, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

function AnalyzerHeader() {
  return (
    <Box
      sx={{
        mt: 3,
        mb: 2,
        px: 2.5,
        py: 1.75,
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 2,
        bgcolor: appColors.bgDeep,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: 28, md: 36 },
            lineHeight: 1.1,
          }}
        >
          Tax Return <Box component="span" sx={{ color: appColors.goldLight, fontStyle: 'italic' }}>Analyzer</Box>
        </Typography>
        <Typography sx={{ mt: 0.5, fontSize: 12, color: appColors.textMuted }}>
          Upload a return, define your prompt, and run AI-style analysis.
        </Typography>
      </Box>
      <Box
        sx={{
          px: 1.2,
          py: 0.45,
          borderRadius: 99,
          border: `1px solid ${appColors.border}`,
          bgcolor: 'rgba(59,125,216,0.12)',
          color: appColors.accentBlue,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        AI Powered
      </Box>
    </Box>
  );
}

export default AnalyzerHeader;
