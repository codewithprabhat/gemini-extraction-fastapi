import { Box, Container, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { appColors } from '../../theme/tokens';

const navItems = [
  { label: 'Extract', to: '/extract/select-document' },
  { label: 'History', to: '/extract/upload' },
  { label: 'API Docs', to: '/extract/upload' },
  { label: 'Settings', to: '/extract/select-document' },
];

function AppShell() {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', bgcolor: appColors.bgVoid }}>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(201,168,76,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 10% 90%, rgba(59,125,216,0.04) 0%, transparent 60%), radial-gradient(ellipse 30% 30% at 90% 80%, rgba(29,184,138,0.03) 0%, transparent 60%)',
        }}
      />

      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 60,
          px: { xs: 2, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'rgba(8,8,8,0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${appColors.gold} 0%, ${appColors.goldDim} 100%)`,
              boxShadow: '0 0 20px rgba(201,168,76,0.25)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Typography sx={{ fontFamily: 'Cormorant Garamond', fontWeight: 600, color: '#000' }}>
              D
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 24,
              color: appColors.goldLight,
            }}
          >
            DocuSense AI
          </Typography>
        </Stack>

        {/* <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navItems.map((item) => (
            <Box
              key={item.label}
              component={NavLink}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              sx={{
                px: 1.75,
                py: 0.75,
                borderRadius: 1.5,
                textDecoration: 'none',
                fontSize: 13,
                color: appColors.textMuted,
                '&.active-link': {
                  color: appColors.gold,
                  backgroundColor: 'rgba(201,168,76,0.08)',
                },
                '&:hover': {
                  color: appColors.textSecondary,
                  backgroundColor: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Stack> */}

        <Box
          title="Prabhat K."
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            fontSize: 11,
            fontWeight: 600,
            color: appColors.gold,
            border: `1px solid ${appColors.borderBright}`,
            background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(138,109,47,0.5))',
          }}
        >
          PK
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 5 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default AppShell;
