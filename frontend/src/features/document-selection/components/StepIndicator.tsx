import { Box, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

interface StepIndicatorProps {
  currentStep: 1 | 2;
}

const steps = [
  { number: 1, label: 'Select Type' },
  { number: 2, label: 'Upload & Extract' },
] as const;

function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 6 }}>
      {steps.map((step, index) => {
        const isDone = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <Stack key={step.number} direction="row" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: { xs: 1, md: 2.5 }, py: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                fontSize: 11,
                fontWeight: 600,
                color: isDone ? appColors.accentTeal : isActive ? '#000' : appColors.textMuted,
                background: isActive
                  ? `linear-gradient(135deg, ${appColors.gold}, ${appColors.goldDim})`
                  : isDone
                  ? 'rgba(29,184,138,0.15)'
                  : 'rgba(255,255,255,0.05)',
                border: isActive
                  ? 'none'
                  : isDone
                  ? '1px solid rgba(29,184,138,0.3)'
                  : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {isDone ? '✓' : step.number}
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                color: isDone
                  ? appColors.accentTeal
                  : isActive
                  ? appColors.textPrimary
                  : appColors.textMuted,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {step.label}
            </Typography>
          </Stack>
          {index < steps.length - 1 && (
            <Box sx={{ width: 48, height: 1, bgcolor: 'rgba(255,255,255,0.08)' }} />
          )}
          </Stack>
        );
      })}
    </Stack>
  );
}

export default StepIndicator;
