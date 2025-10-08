import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, styled } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { ExpandMoreRounded } from '@mui/icons-material';

interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const StyledSelect = styled(MuiSelect)(({ theme, error }) => ({
  backgroundColor: theme.palette.light.main,
  borderRadius: (typeof theme.shape.borderRadius === 'string'
    ? parseInt(theme.shape.borderRadius, 10)
    : theme.shape.borderRadius || 4) * 2,
  fontSize: '1rem',
  color: theme.palette.dark.main,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? theme.palette.accent.main : `${theme.palette.dark.main}33`,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? theme.palette.accent.main : theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: 2,
    borderColor: error ? theme.palette.accent.main : theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    backgroundColor: `${theme.palette.dark.main}0D`,
    '& .MuiSelect-select': {
      color: `${theme.palette.dark.main}80`,
      cursor: 'not-allowed',
    },
  },
  '& .MuiSelect-icon': {
    color: `${theme.palette.dark.main}66`,
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.dark.main,
  position: 'relative',
  transform: 'none',
  marginBottom: theme.spacing(0.75),
  '&.Mui-focused': {
    color: theme.palette.dark.main,
  },
}));

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  options,
  className = '',
  id,
  value,
  onChange,
  disabled,
  name,
}) => {
  const { theme } = useTheme();
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event: any) => {
    if (onChange) {
      // Create a synthetic event that matches React.ChangeEvent<HTMLSelectElement>
      const syntheticEvent = {
        target: {
          value: event.target.value,
          name: name || '',
        },
        currentTarget: event.currentTarget,
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={!!error}
      className={className}
    >
      {label && (
        <StyledInputLabel htmlFor={selectId} shrink={false}>
          {label}
        </StyledInputLabel>
      )}
      <StyledSelect
        id={selectId}
        name={name}
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        error={!!error}
        IconComponent={ExpandMoreRounded}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            sx={{
              fontSize: '1rem',
              color: theme.palette.dark.main,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}1A`,
              },
              '&.Mui-selected': {
                backgroundColor: `${theme.palette.primary.main}26`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}33`,
                },
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
      {error && (
        <FormHelperText
          sx={{
            mt: 0.75,
            fontSize: '0.875rem',
            color: theme.palette.accent.main,
          }}
        >
          {error}
        </FormHelperText>
      )}
      {helperText && !error && (
        <FormHelperText
          sx={{
            mt: 0.75,
            fontSize: '0.875rem',
            color: `${theme.palette.dark.main}99`,
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};