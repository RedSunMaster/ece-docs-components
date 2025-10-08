import React from 'react';
import { Box, Checkbox as MuiCheckbox, CheckboxProps, FormControlLabel, styled, Typography } from '@mui/material';

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  description?: string;
}

const StyledWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  width: 16, // Matches Tailwind's w-4 (16px)
  height: 16, // Matches Tailwind's h-4 (16px)
  color: theme.palette.dark.main + '33', // dark.main with 20% opacity (border-dark/20)
  '&.Mui-checked': {
    color: theme.palette.primary.main, // text-primary
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`, // focus:ring-2 focus:ring-primary
    outlineOffset: 2,
  },
  borderRadius: theme.shape.borderRadius, // Matches rounded
  cursor: 'pointer',
}));

const StyledLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1rem', // text-base (16px)
  fontWeight: 500, // font-medium
  color: theme.palette.dark.main, // text-dark
  cursor: 'pointer',
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem', // text-sm (14px)
  color: theme.palette.dark.main + '99', // dark.main with 60% opacity (text-dark/60)
  marginTop: theme.spacing(0.5), // mt-0.5
}));

export const Checkbox: React.FC<CustomCheckboxProps> = ({
  label,
  description,
  className = '',
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <StyledWrapper className={className}>
      <FormControlLabel
        control={
          <StyledCheckbox
            id={checkboxId}
            {...props}
          />
        }
        label={
          <Box sx={{ ml: 1.5, display: 'flex', flexDirection: 'column' }}>
            <StyledLabel>{label}</StyledLabel>
            {description && <StyledDescription>{description}</StyledDescription>}
          </Box>
        }
      />
    </StyledWrapper>
  );
};