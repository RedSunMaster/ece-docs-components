import React from 'react';
import { IconButton, styled, SxProps, Theme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface ActionButtonProps {
  icon: SvgIconComponent;
  onClick?: () => void;
  label?: string;
  sx?: SxProps<Theme>;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: (typeof theme.shape.borderRadius === 'string'
    ? parseInt(theme.shape.borderRadius, 10)
    : theme.shape.borderRadius || 4) * 2,
  backgroundColor: '#fff',
  border: `1px solid ${theme.palette.dark.main}1A`,
  '&:hover': {
    backgroundColor: '#f9fafb',
  },
  '& svg': {
    color: '#4D3019',
    transition: 'color 0.2s',
  },
  '&:hover svg': {
    color: theme.palette.primary.main,
  },
}));

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  sx,
}) => {
  return (
    <StyledIconButton
      onClick={onClick}
      aria-label={label}
      sx={sx}
    >
      <Icon />
    </StyledIconButton>
  );
};