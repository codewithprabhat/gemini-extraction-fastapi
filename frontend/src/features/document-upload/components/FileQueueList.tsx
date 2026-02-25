import { Box, Button, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';
import { QueuedFile } from '../types';

interface FileQueueListProps {
  files: QueuedFile[];
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onRemoveFile: (id: string) => void;
  onClearFiles: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extension(name: string): string {
  const value = name.split('.').pop();
  return value ? value.toUpperCase() : 'FILE';
}

function FileQueueList({
  files,
  activeFileIndex,
  onSelectFile,
  onRemoveFile,
  onClearFiles,
}: FileQueueListProps) {
  return (
    <Box
      sx={{
        maxHeight: 200,
        overflowY: 'auto',
        p: 2,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography sx={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: appColors.textMuted }}>
          Queued Files ({files.length})
        </Typography>
        <Button
          onClick={onClearFiles}
          disabled={!files.length}
          sx={{ p: 0, minWidth: 0, fontSize: 10, textTransform: 'none', color: appColors.textMuted }}
        >
          Clear all
        </Button>
      </Stack>

      {!files.length ? (
        <Stack alignItems="center" spacing={0.75} sx={{ py: 1.5, color: appColors.textMuted }}>
          <Typography sx={{ fontSize: 12 }}>No files queued yet</Typography>
        </Stack>
      ) : (
        <Stack spacing={0.75}>
          {files.map((item, index) => {
            const active = index === activeFileIndex;
            return (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                spacing={1}
                onClick={() => onSelectFile(index)}
                sx={{
                  px: 1.25,
                  py: 1,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: active ? 'rgba(201,168,76,0.06)' : appColors.bgElevated,
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 12, color: appColors.textPrimary }} noWrap>
                    {item.file.name}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: appColors.textMuted }}>
                    {formatSize(item.file.size)} · {extension(item.file.name)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 10,
                    px: 0.9,
                    py: 0.25,
                    borderRadius: 1,
                    color:
                      item.status === 'processing'
                        ? appColors.gold
                        : item.status === 'error'
                        ? appColors.accentRuby
                        : appColors.accentTeal,
                    backgroundColor:
                      item.status === 'processing'
                        ? 'rgba(201,168,76,0.1)'
                        : item.status === 'error'
                        ? 'rgba(192,57,43,0.1)'
                        : 'rgba(29,184,138,0.1)',
                  }}
                >
                  {item.status === 'extracted' ? 'Extracted' : item.status === 'ready' ? 'Ready' : item.status}
                </Box>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveFile(item.id);
                  }}
                  sx={{ minWidth: 0, p: 0, color: appColors.textMuted, fontSize: 14 }}
                >
                  ×
                </Button>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

export default FileQueueList;
