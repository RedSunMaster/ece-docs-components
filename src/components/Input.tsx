import React from 'react';
import { styled, TextField, TextFieldProps, InputLabel } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant' | 'error'> {
  error?: string;
}

const InputWrapper = styled('div')(({ theme }) => ({
  width: '100%',
}));

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.dark.main,
  marginBottom: theme.spacing(0.75),
  display: 'block',
  position: 'static',
  transform: 'none',
  '&.Mui-focused': {
    color: theme.palette.dark.main,
  },
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => !['errorMessage'].includes(prop as string),
})<{ errorMessage?: string }>(({ theme, errorMessage }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.light.main,
    borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
    fontSize: '1rem',
    color: theme.palette.dark.main,
    minWidth: 0,
    padding: theme.spacing(0, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 4),
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1.25, 0),
      },
    },
    '&:focus-within': {
      outline: `2px solid ${errorMessage ? theme.palette.accent.main : theme.palette.primary.main}`,
      outlineOffset: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: errorMessage ? theme.palette.accent.main : `${theme.palette.dark.main}33`,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: errorMessage ? theme.palette.accent.main : theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.dark.main}0D`,
      '& .MuiInputBase-input': {
        color: `${theme.palette.dark.main}80`,
        cursor: 'not-allowed',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.dark.main}33`,
      },
    },
  },
  '& .MuiFormHelperText-root': {
    marginTop: theme.spacing(0.75),
    fontSize: '0.875rem',
    color: errorMessage ? theme.palette.accent.main : `${theme.palette.dark.main}99`,
  },
}));

export const Input: React.FC<InputProps> = ({
  error,
  fullWidth = false,
  id,
  label,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputWrapper sx={{ ...(!fullWidth && { width: 'auto' }) }}>
      {label && (
        <StyledLabel htmlFor={inputId}>
          {label}
        </StyledLabel>
      )}
      <StyledTextField
        id={inputId}
        error={!!error}
        helperText={error || props.helperText}
        errorMessage={error}
        fullWidth={fullWidth}
        variant="outlined"
        {...props}
      />
    </InputWrapper>
  );
};