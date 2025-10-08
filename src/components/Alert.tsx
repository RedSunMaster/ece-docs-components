import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, styled, SxProps, Theme } from '@mui/material';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { ErrorOutlineRounded, HighlightOffRounded, InfoOutlineRounded, TaskAltRounded } from '@mui/icons-material';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'custom';
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
  sx?: SxProps<Theme>; 
}

const StyledAlert = styled(MuiAlert)<{ customvariant?: string }>(({ theme, customvariant }) => {
  const variants = {
    info: {
      backgroundColor: '#eff6ff',
      borderColor: '#bfdbfe',
      color: '#1e3a8a',
    },
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      color: '#14532d',
    },
    warning: {
      backgroundColor: '#fefce8',
      borderColor: '#fef08a',
      color: '#713f12',
    },
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#fecaca',
      color: '#7f1d1d',
    },
    custom: {
      backgroundColor: theme.palette.light.main,
      borderColor: `${theme.palette.dark.main}33`,
      color: theme.palette.dark.main,
    },
  };

  const variantKey = customvariant as keyof typeof variants || 'info';
  const style = variants[variantKey];

  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    border: `1px solid ${style.borderColor}`,
    borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
    backgroundColor: style.backgroundColor,
    color: style.color,
    '& .MuiAlert-icon': {
      marginRight: 0,
      padding: 0,
      marginTop: '2px',
    },
    '& .MuiAlert-message': {
      padding: 0,
      flex: 1,
    },
  };
});

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  children,
  className = '',
  icon = true,
  sx,
}) => {
  const iconMap = {
    info: <InfoOutlineRounded sx={{fontSize: 20}} />,
    success: <TaskAltRounded sx={{fontSize: 20}} />,
    warning: <ErrorOutlineRounded sx={{fontSize: 20}} />,
    error: <HighlightOffRounded  sx={{fontSize: 20}} />,
    custom: <InfoOutlineRounded sx={{fontSize: 20}} />,
  };

  const severityMap: Record<string, MuiAlertProps['severity']> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    custom: 'info',
  };

  return (
    <StyledAlert
      customvariant={variant}
      severity={severityMap[variant]}
      icon={icon ? iconMap[variant] : false}
      className={className}
      sx={sx}
    >
      {children}
    </StyledAlert>
  );
};