import { Box } from '@mui/material';
import PromptPanelShell from './PromptPanelShell';
import SchemaPanelShell from './SchemaPanelShell';
import { appColors } from '../../../theme/tokens';

interface ConfigWorkspaceLayoutProps {
  prompt: string;
  schema: string;
}

function ConfigWorkspaceLayout({ prompt, schema }: ConfigWorkspaceLayoutProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        border: '1px solid rgba(255,255,255,0.05)',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        minHeight: 620,
        backgroundColor: appColors.bgVoid,
      }}
    >
      <Box sx={{ borderRight: { md: '1px solid rgba(255,255,255,0.05)' }, minHeight: 0 }}>
        <PromptPanelShell prompt={prompt} />
      </Box>
      <Box sx={{ minHeight: 0 }}>
        <SchemaPanelShell schema={schema} />
      </Box>
    </Box>
  );
}

export default ConfigWorkspaceLayout;
