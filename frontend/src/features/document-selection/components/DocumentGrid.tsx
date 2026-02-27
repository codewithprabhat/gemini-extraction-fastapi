import { Box, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';
import { DocumentType } from '../types';
import DocumentTile from './DocumentTile';

interface DocumentGridProps {
  documents: DocumentType[];
  selectedDocumentName: string | null;
  onSelect: (document: DocumentType) => void;
}

function DocumentGrid({ documents, selectedDocumentName, onSelect }: DocumentGridProps) {
  if (!documents.length) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: appColors.textSecondary, fontSize: 14 }}>
          No document types match your current filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 20 }}>
      <Typography
        sx={{
          fontSize: 10,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: appColors.textMuted,
          mb: 1.75,
        }}
      >
        Common Tax Forms
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          color: appColors.goldDim,
          mb: 2,
        }}
      >
        W-2, 1099-SA, 5498-SA, 5498, and SSA-1099 are available now. More document types are coming soon as implementation is in progress.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(auto-fill, minmax(180px, 1fr))',
          },
          gap: 1.75,
        }}
      >
        {documents.map((document) => (
          <DocumentTile
            key={document.id}
            document={document}
            isSelected={selectedDocumentName === document.name}
            onSelect={onSelect}
          />
        ))}
      </Box>
    </Box>
  );
}

export default DocumentGrid;
