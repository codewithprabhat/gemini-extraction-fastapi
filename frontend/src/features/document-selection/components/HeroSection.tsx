import { Box, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

function HeroSection() {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
      <Typography
        sx={{
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: appColors.goldDim,
          mb: 2.5,
        }}
      >
        AI-Powered Tax Extraction
      </Typography>

      <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 68 }, lineHeight: 1.05, mb: 2 }}>
        Select <Box component="span" sx={{ color: appColors.goldLight, fontStyle: 'italic' }}>Document Type</Box>
      </Typography>

      <Typography sx={{ fontSize: 15, color: appColors.textSecondary, maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
        Choose the tax form to process. Our AI is trained on thousands of variations per document
        type for maximum accuracy.
      </Typography>
    </Box>
  );
}

export default HeroSection;
