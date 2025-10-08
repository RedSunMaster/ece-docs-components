import React from 'react';
import { Box, styled, SxProps, Theme } from '@mui/material';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'elevated';
  sx?: SxProps<Theme>; // Add sx prop to support Material-UI styling
}

const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'customPadding' && prop !== 'customVariant',
})<{ customPadding: string; customVariant: string }>(({ theme, customPadding, customVariant }) => {
  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: theme.spacing(2) }, // 16px
    md: { padding: theme.spacing(3) }, // 24px
    lg: { padding: theme.spacing(4) }, // 32px
  };

  const variantStyles = {
    default: {
      border: `1px solid ${theme.palette.dark.main}10`, // dark.main with 10% opacity
    },
    bordered: {
      border: `2px solid ${theme.palette.dark.main}20`, // dark.main with 20% opacity
    },
    elevated: {
      border: `1px solid ${theme.palette.dark.main}05`, // dark.main with 5% opacity
      boxShadow: theme.shadows[4], // MUI shadow level 4 for "elevated"
    },
  };

  const borderRadiusValue = typeof theme.shape.borderRadius === 'string'
    ? parseInt(theme.shape.borderRadius, 10)
    : theme.shape.borderRadius || 4;

  return {
    borderRadius: borderRadiusValue * 2, // Matches rounded-xl (approx 12px)
    overflow: 'visible',
    backgroundColor: theme.palette.light.main, // Matches #FEFDF7
    ...paddingStyles[customPadding as keyof typeof paddingStyles],
    ...variantStyles[customVariant as keyof typeof variantStyles],
  };
});

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
  sx, // Destructure sx prop
}) => {
  return (
    <StyledCard
      className={className}
      customPadding={padding}
      customVariant={variant}
      sx={sx} // Pass sx prop to StyledCard
    >
      {children}
    </StyledCard>
  );
};