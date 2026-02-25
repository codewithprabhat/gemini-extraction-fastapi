import { Box, InputAdornment, Stack, Tab, Tabs, TextField } from '@mui/material';
import { appColors } from '../../../theme/tokens';
import { FilterCategory } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  activeCategory: FilterCategory;
  onCategoryChange: (value: FilterCategory) => void;
}

function FilterBar({
  searchQuery,
  onSearchQueryChange,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ md: 'center' }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 3.5 }}
    >
      <TextField
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
        placeholder="Search document types..."
        size="small"
        sx={{
          width: '100%',
          maxWidth: 340,
          '& .MuiOutlinedInput-root': {
            bgcolor: appColors.bgElevated,
            color: appColors.textPrimary,
            borderRadius: 2,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.07)' },
            '&:hover fieldset': { borderColor: appColors.borderBright },
            '&.Mui-focused fieldset': { borderColor: appColors.borderBright },
          },
          '& input::placeholder': {
            color: appColors.textMuted,
            opacity: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{ width: 18, height: 18, stroke: appColors.textMuted, fill: 'none', strokeWidth: 2 }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </Box>
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 2,
          bgcolor: appColors.bgElevated,
          p: 0.5,
          width: { xs: '100%', md: 'auto' },
        }}
      >
        <Tabs
          value={activeCategory}
          onChange={(_, value: FilterCategory) => onCategoryChange(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 0,
            '& .MuiTabs-indicator': { display: 'none' },
          }}
        >
          {[
            { label: 'All Types', value: 'all' },
            { label: 'Income', value: 'income' },
            { label: 'Interest', value: 'interest' },
            { label: 'Other', value: 'other' },
          ].map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              sx={{
                minHeight: 0,
                textTransform: 'none',
                fontSize: 12,
                color: appColors.textMuted,
                borderRadius: 1.5,
                px: 1.75,
                py: 0.75,
                '&.Mui-selected': {
                  color: appColors.gold,
                  bgcolor: 'rgba(201,168,76,0.12)',
                  border: `1px solid ${appColors.border}`,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Stack>
  );
}

export default FilterBar;
