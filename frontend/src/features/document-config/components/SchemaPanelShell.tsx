import { Box, Button, Stack, Typography } from '@mui/material';
import { appColors } from '../../../theme/tokens';

interface SchemaPanelShellProps {
  schema: string;
}

function SchemaPanelShell({ schema }: SchemaPanelShellProps) {
  const schemaLines = schema.split('\n').length;
  const fieldCount = (schema.match(/"type":/g) ?? []).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2.25,
          py: 1.4,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          backgroundColor: 'rgba(8,8,8,0.7)',
        }}
      >
        <Typography sx={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: appColors.textSecondary }}>
          JSON Output Schema
        </Typography>
        <Box
          sx={{
            px: 1,
            py: 0.3,
            borderRadius: 0.8,
            fontFamily: "'Fira Code', monospace",
            fontSize: 9,
            color: appColors.accentTeal,
            border: '1px solid rgba(29,184,138,0.2)',
            backgroundColor: 'rgba(29,184,138,0.1)',
          }}
        >
          SCHEMA
        </Box>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={0.8}
        sx={{ px: 2.25, py: 1, borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'rgba(29,184,138,0.02)' }}
      >
        <Typography sx={{ fontSize: 10, color: appColors.accentTeal }}>
          Valid JSON schema
        </Typography>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <Box
          sx={{
            width: 44,
            py: 2.2,
            px: 1,
            borderRight: '1px solid rgba(255,255,255,0.03)',
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
        >
          {Array.from({ length: schemaLines }, (_, index) => (
            <Typography
              key={index}
              sx={{
                textAlign: 'right',
                fontFamily: "'Fira Code', monospace",
                fontSize: 11,
                lineHeight: 1.72,
                color: appColors.textMuted,
              }}
            >
              {index + 1}
            </Typography>
          ))}
        </Box>
        <Box
          component="textarea"
          value={schema}
          readOnly
          sx={{
            flex: 1,
            py: 2.2,
            px: 2.5,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: appColors.textSecondary,
            fontSize: 12,
            lineHeight: 1.72,
            fontFamily: "'Fira Code', monospace",
            resize: 'none',
          }}
        />
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 2.25,
          py: 1.2,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          backgroundColor: 'rgba(0,0,0,0.25)',
        }}
      >
        <Typography sx={{ fontSize: 10, color: appColors.textMuted }}>
          Fields: <Box component="span" sx={{ color: appColors.textSecondary, fontFamily: "'Fira Code', monospace" }}>{fieldCount}</Box>
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: 11,
              color: appColors.textSecondary,
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}
          >
            Format
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: 11,
              color: appColors.gold,
              border: `1px solid ${appColors.border}`,
              backgroundColor: 'rgba(201,168,76,0.06)',
            }}
          >
            Edit Schema
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SchemaPanelShell;
