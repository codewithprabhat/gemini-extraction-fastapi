import { Box, Button, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

interface ConfigToolbarProps {
  documentName: string;
}

function ConfigToolbar({ documentName }: ConfigToolbarProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        minHeight: 44,
        px: 2.5,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        backgroundColor: appColors.bgDeep,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            px: 1.2,
            py: 0.6,
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.07)',
            backgroundColor: appColors.bgElevated,
            fontSize: 12,
            color: appColors.textSecondary,
          }}
        >
          Type: <Typography component="span" sx={{ fontSize: 12, color: appColors.textPrimary }}>{documentName}</Typography>
        </Box>
        <Typography sx={{ fontSize: 10, color: appColors.textMuted, fontFamily: "'Fira Code', monospace" }}>
          v3.1 · Saved 2m ago
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            textTransform: 'none',
            fontSize: 12,
            color: appColors.textSecondary,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        >
          Reset to Default
        </Button>
        <Button
          sx={{
            textTransform: 'none',
            fontSize: 12,
            color: appColors.textSecondary,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        >
          Preview
        </Button>
        <Button
          sx={{
            textTransform: 'none',
            fontSize: 12,
            color: '#000',
            border: `1px solid ${appColors.borderBright}`,
            background: `linear-gradient(135deg, ${appColors.goldLight}, ${appColors.gold} 50%, #9A6E28)`,
            boxShadow: '0 3px 16px rgba(201,168,76,0.28)',
            '&:hover': {
              background: `linear-gradient(135deg, ${appColors.goldLight}, ${appColors.gold} 50%, #9A6E28)`,
              boxShadow: '0 6px 24px rgba(201,168,76,0.4)',
            },
          }}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  );
}

export default ConfigToolbar;
