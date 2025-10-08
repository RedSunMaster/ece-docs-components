import React from 'react';
import { Box, FormControl, FormLabel, FormHelperText, FormControlLabel, styled, Typography } from '@mui/material';
import { useTheme } from '../ThemeProvider';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

const CustomRadioIcon = styled('span')<{ checked?: boolean }>(({ theme, checked }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  border: checked ? `5px solid ${theme.palette.secondary.main}` : `2px solid ${theme.palette.dark.main}4D`,
  transition: 'all 0.2s',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Radio: React.FC<RadioProps> = ({
  label,
  description,
  className = '',
  id,
  checked,
  ...props
}) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const { theme } = useTheme();

  return (
    <FormControlLabel
      className={className}
      control={
        <Box sx={{ display: 'flex', alignItems: 'center', height: 24, mr: 1.5 }}>
          <input
            id={radioId}
            type="radio"
            style={{ display: 'none' }}
            checked={checked}
            {...props}
          />
          <CustomRadioIcon 
            checked={checked}
            onClick={(e) => {
              const input = document.getElementById(radioId) as HTMLInputElement;
              if (input && !props.disabled) {
                input.click();
              }
            }}
            sx={{
              cursor: props.disabled ? 'not-allowed' : 'pointer',
              opacity: props.disabled ? 0.5 : 1,
            }}
          />
        </Box>
      }
      label={
        <Box sx={{ ml: 0 }}>
          <Typography
            component="label"
            htmlFor={radioId}
            sx={{
              fontSize: '1rem',
              fontWeight: 500,
              color: theme.palette.dark.main,
              cursor: props.disabled ? 'not-allowed' : 'pointer',
              opacity: props.disabled ? 0.5 : 1,
            }}
          >
            {label}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                color: `${theme.palette.dark.main}99`,
                mt: 0.25,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      }
      sx={{ alignItems: 'flex-start', ml: 0 }}
    />
  );
};

interface RadioGroupProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  children,
  className = ''
}) => {
  const { theme } = useTheme();

  return (
    <FormControl component="fieldset" className={className} error={!!error} fullWidth>
      {label && (
        <FormLabel
          component="legend"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.dark.main,
            mb: 1.5,
            '&.Mui-focused': {
              color: theme.palette.dark.main,
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {children}
      </Box>
      {error && (
        <FormHelperText
          sx={{
            mt: 1,
            fontSize: '0.875rem',
            color: theme.palette.accent.main,
          }}
        >
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};