import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { appColors } from '../../../theme/tokens';

interface UploadHeaderProps {
  documentName: string;
}

function UploadHeader({ documentName }: UploadHeaderProps) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        py: 2,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        mb: 2.5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: 13, color: appColors.textMuted }}>Extract</Typography>
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
          {documentName}
        </Box>
      </Stack>

      <Button
        onClick={() => navigate('/extract/select-document')}
        sx={{
          textTransform: 'none',
          fontSize: 12,
          color: appColors.textSecondary,
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        Change Type
      </Button>
    </Stack>
  );
}

export default UploadHeader;
