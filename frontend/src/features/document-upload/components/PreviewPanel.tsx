import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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

function getModalPdfWidth(): number {
  if (typeof window === 'undefined') {
    return 920;
  }

  const availableWidth = window.innerWidth - 120;
  return Math.max(360, Math.min(availableWidth, 1200));
}

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
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [modalFileIndex, setModalFileIndex] = useState<number | null>(null);
  const [modalPdfWidth, setModalPdfWidth] = useState(getModalPdfWidth);
  const [modalPdfNumPages, setModalPdfNumPages] = useState(1);

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

  useEffect(() => {
    const handleResize = () => {
      setModalPdfWidth(getModalPdfWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (modalFileIndex === null) {
      return;
    }

    if (!files.length || modalFileIndex > files.length - 1) {
      setIsPreviewModalOpen(false);
      setModalFileIndex(null);
    }
  }, [files, modalFileIndex]);

  useEffect(() => {
    setModalPdfNumPages(1);
  }, [modalFileIndex]);

  const handleOpenPreviewModal = (index: number) => {
    onSelectFile(index);
    setModalFileIndex(index);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setModalFileIndex(null);
  };

  const modalFile = modalFileIndex !== null ? files[modalFileIndex] ?? null : null;
  const modalPreviewKind = modalFile ? getPreviewKind(modalFile.file) : 'unsupported';
  const modalPreviewUrl = modalFile ? previewUrlById.get(modalFile.id) : undefined;

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
                  onClick={() => handleOpenPreviewModal(index)}
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

      <Modal open={isPreviewModalOpen} onClose={handleClosePreviewModal}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(6,6,6,0.94)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 2.5,
              py: 1.5,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'rgba(0,0,0,0.5)',
            }}
          >
            <Typography sx={{ fontSize: 12, color: appColors.textSecondary }}>
              {modalFile ? `${documentName} · ${modalFile.file.name}` : 'Document Preview'}
            </Typography>
            <IconButton
              onClick={handleClosePreviewModal}
              aria-label="Close fullscreen preview"
              sx={{ color: appColors.textSecondary }}
            >
              <Typography component="span" sx={{ fontSize: 22, lineHeight: 1 }}>
                ×
              </Typography>
            </IconButton>
          </Stack>

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {!modalFile ? (
              <Typography sx={{ fontSize: 14, color: appColors.textMuted }}>
                No file selected for preview.
              </Typography>
            ) : (
              <>
                {modalPreviewKind === 'pdf' && modalPreviewUrl && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Document
                      file={modalPreviewUrl}
                      onLoadSuccess={({ numPages }) => setModalPdfNumPages(numPages)}
                      loading={<Typography sx={{ fontSize: 14, color: appColors.textMuted }}>Loading PDF preview...</Typography>}
                      error={<Typography sx={{ fontSize: 14, color: '#F87171' }}>Unable to load this PDF preview.</Typography>}
                    >
                      <Stack spacing={2} sx={{ alignItems: 'center', width: '100%', pb: 2 }}>
                        {Array.from({ length: modalPdfNumPages }, (_, index) => (
                          <Box
                            key={`${modalFile.id}-${index + 1}`}
                            sx={{
                              border: '1px solid rgba(255,255,255,0.08)',
                              backgroundColor: '#ffffff',
                              boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
                            }}
                          >
                            <Page
                              pageNumber={index + 1}
                              width={modalPdfWidth}
                              renderAnnotationLayer={false}
                              renderTextLayer={false}
                            />
                          </Box>
                        ))}
                      </Stack>
                    </Document>
                  </Box>
                )}

                {modalPreviewKind === 'image' && modalPreviewUrl && (
                  <Box
                    component="img"
                    src={modalPreviewUrl}
                    alt={modalFile.file.name}
                    sx={{
                      width: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: '#0b0b0c',
                    }}
                  />
                )}

                {modalPreviewKind === 'unsupported' && (
                  <Typography sx={{ fontSize: 14, color: appColors.textMuted, textAlign: 'center' }}>
                    Preview is not available for this file format.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default PreviewPanel;
