import { Button, Stack } from '@mui/material';
import { appColors } from '../../../theme/tokens';

interface UploadBottomActionsProps {
  disabled: boolean;
  onExportJson: () => void;
  onCopyJson: () => void;
}

function UploadBottomActions({
  disabled,
  onExportJson,
  onCopyJson,
}: UploadBottomActionsProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ p: 2.5, borderTop: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(8,8,8,0.6)' }}>
      <Button
        disabled={disabled}
        onClick={onExportJson}
        sx={{
          textTransform: 'none',
          color: appColors.gold,
          border: `1px solid ${appColors.borderBright}`,
        }}
      >
        Export JSON
      </Button>
      <Button
        disabled={disabled}
        onClick={onCopyJson}
        sx={{
          textTransform: 'none',
          color: appColors.textSecondary,
          border: '1px solid rgba(255,255,255,0.07)',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        Copy
      </Button>
      <Button
        disabled={disabled}
        sx={{
          textTransform: 'none',
          color: appColors.textSecondary,
          border: '1px solid rgba(255,255,255,0.07)',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        Send to Webhook
      </Button>
    </Stack>
  );
}

export default UploadBottomActions;
