import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { appColors } from '../../../theme/tokens';

interface ConfigHeaderProps {
  documentName: string;
  documentId: string;
}

function ConfigHeader({ documentName, documentId }: ConfigHeaderProps) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        py: 2,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: 13, color: appColors.textMuted }}>Extract</Typography>
        <Typography sx={{ fontSize: 12, color: appColors.textMuted }}>›</Typography>
        <Typography sx={{ fontSize: 13, color: appColors.textMuted }}>{documentName}</Typography>
        <Typography sx={{ fontSize: 12, color: appColors.textMuted }}>›</Typography>
        <Box
          sx={{
            px: 1.25,
            py: 0.4,
            borderRadius: 99,
            border: `1px solid ${appColors.border}`,
            backgroundColor: 'rgba(201,168,76,0.1)',
            color: appColors.gold,
            fontSize: 11,
            fontFamily: "'Fira Code', monospace",
          }}
        >
          Config
        </Box>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          onClick={() => navigate(`/extract/upload?docId=${encodeURIComponent(documentId)}`)}
          sx={{
            textTransform: 'none',
            fontSize: 12,
            color: appColors.textSecondary,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.04)',
          }}
        >
          Back
        </Button>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(138,109,47,0.5))',
            border: `1px solid ${appColors.borderBright}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 600,
            color: appColors.gold,
          }}
        >
          PK
        </Box>
      </Stack>
    </Stack>
  );
}

export default ConfigHeader;
