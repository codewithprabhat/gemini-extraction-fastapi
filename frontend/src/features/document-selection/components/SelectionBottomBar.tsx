import { Box, Button, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

interface SelectionBottomBarProps {
  selectedLabel: string | null;
  onContinue: () => void;
}

function SelectionBottomBar({ selectedLabel, onContinue }: SelectionBottomBarProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        bgcolor: 'rgba(8,8,8,0.9)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 5 },
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: selectedLabel ? 'rgba(201,168,76,0.15)' : appColors.bgElevated,
              border: `1px solid ${selectedLabel ? appColors.border : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{
                width: 18,
                height: 18,
                fill: 'none',
                stroke: selectedLabel ? appColors.gold : appColors.textMuted,
                strokeWidth: 1.5,
              }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: appColors.textMuted }}>
              Selected Document
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: selectedLabel ? appColors.goldLight : appColors.textPrimary }}>
              {selectedLabel ?? 'None selected'}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.25}>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'rgba(255,255,255,0.08)',
              color: appColors.textSecondary,
              textTransform: 'none',
              px: 2.5,
            }}
          >
            View History
          </Button>
          <Button
            onClick={onContinue}
            disabled={!selectedLabel}
            endIcon={<Box component="span">→</Box>}
            sx={{
              textTransform: 'none',
              px: 3.5,
              color: '#000',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${appColors.goldLight} 0%, ${appColors.gold} 50%, #A8762A 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${appColors.goldLight} 0%, ${appColors.gold} 60%, #A8762A 100%)`,
              },
              '&.Mui-disabled': {
                opacity: 0.45,
                color: '#000',
              },
            }}
          >
            {selectedLabel ? `Continue with ${selectedLabel.split(' — ')[0]}` : 'Select a document type'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default SelectionBottomBar;
