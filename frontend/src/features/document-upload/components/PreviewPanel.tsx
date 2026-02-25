import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { appColors } from '../../../theme/tokens';
import { QueuedFile } from '../types';

interface PreviewPanelProps {
  files: QueuedFile[];
  activeFileIndex: number;
  documentName: string;
  onSelectFile: (index: number) => void;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PreviewKind = 'pdf' | 'image' | 'unsupported';

function getPreviewKind(file: File): PreviewKind {
  const mime = file.type.toLowerCase();
  if (mime === 'application/pdf') {
    return 'pdf';
  }
  if (mime.startsWith('image/')) {
    return 'image';
  }

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') {
    return 'pdf';
  }
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'].includes(extension ?? '')) {
    return 'image';
  }

  return 'unsupported';
}

function PreviewPanel({ files, activeFileIndex, documentName, onSelectFile }: PreviewPanelProps) {
  const previewUrlById = useMemo(() => {
    const map = new Map<string, string>();
    files.forEach((item) => {
      map.set(item.id, URL.createObjectURL(item.file));
    });
    return map;
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrlById.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrlById]);

  return (
    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(8,8,8,0.6)' }}
      >
        <Typography sx={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: appColors.textSecondary }}>
          Document Preview
        </Typography>
      </Stack>

      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          gap: 0.5,
          overflowX: 'auto',
          bgcolor: 'rgba(0,0,0,0.2)',
        }}
      >
        {files.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => onSelectFile(index)}
            sx={{
              px: 1.5,
              py: 0.6,
              borderRadius: 1.25,
              fontSize: 11,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              color: index === activeFileIndex ? appColors.gold : appColors.textMuted,
              border: index === activeFileIndex ? `1px solid ${appColors.border}` : '1px solid transparent',
              backgroundColor: index === activeFileIndex ? 'rgba(201,168,76,0.08)' : 'transparent',
            }}
          >
            {item.file.name.length > 18 ? `${item.file.name.slice(0, 15)}...` : item.file.name}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: files.length ? 'flex-start' : 'center',
          bgcolor: 'rgba(0,0,0,0.15)',
        }}
      >
        {!files.length ? (
          <Typography sx={{ fontSize: 12, color: appColors.textMuted }}>
            Upload a document to preview
          </Typography>
        ) : (
          <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 420 }}>
            {files.map((item, index) => {
              const isActive = index === activeFileIndex;
              const previewKind = getPreviewKind(item.file);
              const previewUrl = previewUrlById.get(item.id);

              return (
                <Box
                  key={item.id}
                  onClick={() => onSelectFile(index)}
                  sx={{
                    borderRadius: 1.2,
                    overflow: 'hidden',
                    border: isActive ? `1px solid ${appColors.gold}` : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: isActive ? '0 8px 30px rgba(201,168,76,0.2)' : '0 6px 20px rgba(0,0,0,0.35)',
                    bgcolor: '#0f0f10',
                    cursor: 'pointer',
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      px: 1.5,
                      py: 1,
                      bgcolor: 'rgba(0,0,0,0.45)',
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: 9,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    <span>{documentName} · PREVIEW</span>
                    <span>{item.file.name}</span>
                  </Stack>

                  <Box
                    sx={{
                      minHeight: 220,
                      maxHeight: 340,
                      overflow: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      p: 1.25,
                      bgcolor: '#151516',
                    }}
                  >
                    {previewKind === 'pdf' && previewUrl && (
                      <Document
                        file={previewUrl}
                        loading={<Typography sx={{ fontSize: 12, color: appColors.textMuted }}>Loading PDF preview...</Typography>}
                        error={<Typography sx={{ fontSize: 12, color: '#F87171' }}>Unable to load this PDF preview.</Typography>}
                      >
                        <Page
                          pageNumber={1}
                          width={360}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                        />
                      </Document>
                    )}

                    {previewKind === 'image' && previewUrl && (
                      <Box
                        component="img"
                        src={previewUrl}
                        alt={item.file.name}
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          height: 'auto',
                          borderRadius: 0.8,
                          objectFit: 'contain',
                          border: '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: '#0b0b0c',
                        }}
                      />
                    )}

                    {previewKind === 'unsupported' && (
                      <Typography sx={{ fontSize: 12, color: appColors.textMuted, textAlign: 'center', mt: 2 }}>
                        Preview is not available for this file format.
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default PreviewPanel;
