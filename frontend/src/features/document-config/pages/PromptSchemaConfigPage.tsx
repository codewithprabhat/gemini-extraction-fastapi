import { Box, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfigHeader from '../components/ConfigHeader';
import ConfigToolbar from '../components/ConfigToolbar';
import ConfigWorkspaceLayout from '../components/ConfigWorkspaceLayout';
import { DEFAULT_PROMPT, DEFAULT_SCHEMA } from '../constants/defaultConfigContent';
import { documentTypes } from '../../document-selection/data/documentTypes';
import { appColors } from '../../../theme/tokens';

function PromptSchemaConfigPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedDocument = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const docId = params.get('docId');

    if (!docId) {
      return null;
    }

    return documentTypes.find((item) => item.id === docId) ?? null;
  }, [location.search]);

  useEffect(() => {
    if (!selectedDocument) {
      navigate('/extract/select-document', { replace: true });
    }
  }, [navigate, selectedDocument]);

  if (!selectedDocument) {
    return null;
  }

  return (
    <Box sx={{ pb: 4 }}>
      <ConfigHeader documentName={selectedDocument.name} documentId={selectedDocument.id} />
      <ConfigToolbar documentName={selectedDocument.name} />
      <ConfigWorkspaceLayout prompt={DEFAULT_PROMPT} schema={DEFAULT_SCHEMA} />

      <Box
        sx={{
          position: 'fixed',
          left: '50%',
          bottom: 24,
          transform: 'translateX(-50%)',
          px: 2,
          py: 1,
          borderRadius: 1,
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: appColors.bgSurface,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: appColors.accentTeal }} />
        <Typography sx={{ fontSize: 12, color: appColors.textPrimary }}>
          Layout-only preview configured
        </Typography>
      </Box>
    </Box>
  );
}

export default PromptSchemaConfigPage;
