import { Box, Tooltip, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { appColors } from '../../../theme/tokens';
import { DocumentIconKey, DocumentType } from '../types';

interface DocumentTileProps {
  document: DocumentType;
  isSelected: boolean;
  onSelect: (document: DocumentType) => void;
}

function TileIcon({ icon }: { icon: DocumentIconKey }) {
  const style = { width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 } as const;

  const byIcon: Record<DocumentIconKey, ReactElement> = {
    document: (
      <svg viewBox="0 0 24 24" style={style}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
      </svg>
    ),
    health: (
      <svg viewBox="0 0 24 24" style={style}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" style={style}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    dollar: (
      <svg viewBox="0 0 24 24" style={style}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" style={style}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" style={style}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    trend: (
      <svg viewBox="0 0 24 24" style={style}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" style={style}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" style={style}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    more: (
      <svg viewBox="0 0 24 24" style={style}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    ),
  };

  return byIcon[icon];
}

function DocumentTile({ document, isSelected, onSelect }: DocumentTileProps) {
  const isDisabled = document.disabled;
  const canSelect = !isDisabled;
  const tooltipText = isDisabled ? 'Coming soon: implementation for this document type is in progress.' : document.tooltip;

  return (
    <Tooltip title={tooltipText} placement="top" arrow>
      <Box
        onClick={() => {
          if (!canSelect) {
            return;
          }
          onSelect(document);
        }}
        aria-disabled={isDisabled}
        sx={{
          position: 'relative',
          bgcolor: appColors.bgElevated,
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 3,
          px: 2.25,
          py: 3,
          cursor: canSelect ? 'pointer' : 'not-allowed',
          opacity: canSelect ? 1 : 0.58,
          textAlign: 'center',
          transition: 'all 0.2s ease',
          transform: isSelected && canSelect ? 'translateY(-2px)' : 'none',
          borderColor: isSelected && canSelect ? appColors.gold : 'rgba(255,255,255,0.07)',
          boxShadow: isSelected
            && canSelect
            ? '0 0 0 1px rgba(201,168,76,0.2), 0 8px 32px rgba(201,168,76,0.12)'
            : 'none',
          '&:hover': {
            transform: canSelect ? 'translateY(-2px)' : 'none',
            borderColor: canSelect ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.07)',
            boxShadow: canSelect ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          },
        }}
      >
        {document.badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontSize: 9,
              px: 0.9,
              py: 0.2,
              borderRadius: 1,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isDisabled ? appColors.textMuted : document.badge === 'popular' ? appColors.accentTeal : '#6BA4E8',
              backgroundColor:
                isDisabled
                  ? 'rgba(255,255,255,0.06)'
                  : document.badge === 'popular'
                    ? 'rgba(29,184,138,0.12)'
                    : 'rgba(59,125,216,0.12)',
            }}
          >
            {document.badge}
          </Box>
        )}

        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: appColors.gold,
            color: '#000',
            display: isSelected ? 'grid' : 'none',
            placeItems: 'center',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          ✓
        </Box>

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            mx: 'auto',
            mb: 1.75,
            display: 'grid',
            placeItems: 'center',
            color: isDisabled ? appColors.textMuted : appColors.gold,
            border: `1px solid ${appColors.border}`,
            background: isDisabled
              ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
              : isSelected
              ? 'linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.08) 100%)'
              : 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
          }}
        >
          <TileIcon icon={document.icon} />
        </Box>

        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
            color: isDisabled
              ? appColors.textSecondary
              : isSelected
                ? appColors.goldLight
                : appColors.textPrimary,
          }}
        >
          {document.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: isDisabled ? 'rgba(255,255,255,0.45)' : appColors.textMuted,
            mt: 0.5,
            lineHeight: 1.5,
          }}
        >
          {document.description}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default DocumentTile;
