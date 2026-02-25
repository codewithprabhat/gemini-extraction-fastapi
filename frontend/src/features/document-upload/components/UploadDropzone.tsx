import { Box, Typography } from '@mui/material';
import { useRef } from 'react';
import { appColors } from '../../../theme/tokens';

interface UploadDropzoneProps {
  isDragOver: boolean;
  onDragOverChange: (isOver: boolean) => void;
  onFilesAdd: (files: FileList | File[]) => void;
}

function UploadDropzone({ isDragOver, onDragOverChange, onFilesAdd }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          onDragOverChange(true);
        }}
        onDragLeave={() => onDragOverChange(false)}
        onDrop={(event) => {
          event.preventDefault();
          onDragOverChange(false);
          onFilesAdd(event.dataTransfer.files);
        }}
        sx={{
          border: '1.5px dashed rgba(201,168,76,0.2)',
          borderColor: isDragOver ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)',
          borderRadius: 2.5,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragOver ? 'rgba(201,168,76,0.04)' : 'rgba(201,168,76,0.015)',
          transition: 'all 0.2s ease',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.heic,.tiff,.tif"
          onChange={(event) => {
            if (event.target.files) {
              onFilesAdd(event.target.files);
              event.target.value = '';
            }
          }}
          style={{ display: 'none' }}
        />

        <Box
          sx={{
            width: 48,
            height: 48,
            mx: 'auto',
            mb: 1.5,
            borderRadius: 2.5,
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.14), rgba(201,168,76,0.04))',
            display: 'grid',
            placeItems: 'center',
            color: appColors.gold,
          }}
        >
          ↑
        </Box>
        <Typography sx={{ fontSize: 13, color: appColors.textPrimary, mb: 0.5 }}>
          Drop files here or click to browse
        </Typography>
        <Typography sx={{ fontSize: 11, color: appColors.textMuted, mb: 1.25, lineHeight: 1.5 }}>
          Upload one or multiple documents. We&apos;ll process them simultaneously.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.75 }}>
          {['PDF', 'PNG', 'JPG', 'HEIC', 'TIFF'].map((format) => (
            <Box
              key={format}
              sx={{
                px: 0.9,
                py: 0.2,
                borderRadius: 1,
                border: '1px solid rgba(255,255,255,0.07)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: appColors.textMuted,
                fontFamily: "'Fira Code', monospace",
                fontSize: 9,
              }}
            >
              {format}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UploadDropzone;
