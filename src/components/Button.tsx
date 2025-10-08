import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'marked-read' | 'mark-read' | 'danger'; // Add 'danger'
  size?: 'sm' | 'md' | 'lg';
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'customVariant' && prop !== 'customSize',
})<{ customVariant: string; customSize: string }>(({ theme, customVariant, customSize }) => {
  const currentTheme = theme.palette;

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: '0.875rem',
    },
    md: {
      padding: '10px 16px',
      fontSize: '1rem',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '1.125rem',
    },
  };

  // Base styles
  const baseStyles = {
    fontWeight: 500,
    borderRadius: '8px',
    textTransform: 'none' as const,
    transition: 'all 0.2s',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ...sizeStyles[customSize as keyof typeof sizeStyles],
  };

  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: currentTheme.primary.main,
      color: currentTheme.custom?.primaryButtonTextColor || '#FFFFFF',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        backgroundColor: currentTheme.primary.main,
        opacity: 0.9,
      },
    },
    secondary: {
      backgroundColor: currentTheme.secondary.main,
      color: currentTheme.dark.main,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        backgroundColor: currentTheme.secondary.main,
        opacity: 0.9,
      },
    },
    outline: {
      backgroundColor: currentTheme.light.main,
      border: `2px solid rgba(77, 48, 25, 0.2)`,
      color: currentTheme.dark.main,
      '&:hover': {
        backgroundColor: 'rgba(77, 48, 25, 0.05)',
        borderColor: 'rgba(77, 48, 25, 0.3)',
      },
    },
    'marked-read': {
      backgroundColor: 'rgba(163, 217, 119, 0.1)',
      border: `2px solid ${currentTheme.markedRead.main}`,
      color: currentTheme.dark.main,
      isDisabled: true,
      '&:hover': {
        backgroundColor: 'rgba(163, 217, 119, 0.2)',
        cursor: 'not-allowed',
      },
    },
    'mark-read': {
      backgroundColor: currentTheme.custom?.markAsReadBackgroundColor || currentTheme.accent.main,
      border: `2px solid ${currentTheme.custom?.markAsReadBorderColor || currentTheme.secondary.main}`,
      color: currentTheme.dark.main,
      '&:hover': {
        opacity: 0.9,
      },
    },
    danger: { // New danger variant
      backgroundColor: '#D32F2F', // Material-UI red
      color: '#FFFFFF',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        backgroundColor: '#B71C1C',
        opacity: 0.9,
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[customVariant as keyof typeof variantStyles],
  };
});

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  ...props
}) => {

  return (
    <StyledButton
      customVariant={variant}
      customSize={size}
      fullWidth={fullWidth}
      disableRipple
      {...props}
    >
      {children}
    </StyledButton>
  );
};