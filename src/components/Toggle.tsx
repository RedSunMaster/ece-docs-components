import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';

interface ToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleButton = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(0.75, 1.5),
  borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
  backgroundColor: '#fff',
  border: `1px solid ${theme.palette.dark.main}33`,
  cursor: 'pointer',
  transition: 'border-color 0.2s',
  '&:hover': {
    borderColor: `${theme.palette.dark.main}4D`,
  },
}));

const ToggleTrack = styled(Box)<{ isChecked: boolean }>(({ theme, isChecked }) => ({
  position: 'relative',
  width: '56px',
  height: '32px',
  borderRadius: '9999px',
  backgroundColor: isChecked ? theme.palette.secondary.main : '#e5e7eb',
  transition: 'background-color 0.2s',
}));

const ToggleThumb = styled(Box)<{ isChecked: boolean }>(({ isChecked }) => ({
  position: 'absolute',
  top: '4px',
  width: '24px',
  height: '24px',
  backgroundColor: '#fff',
  borderRadius: '9999px',
  transition: 'transform 0.2s',
  transform: isChecked ? 'translateX(28px)' : 'translateX(4px)',
}));

export const Toggle: React.FC<ToggleProps> = ({
  label = 'Admin view',
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <ToggleButton onClick={handleToggle}>
      <ToggleTrack isChecked={isChecked}>
        <ToggleThumb isChecked={isChecked} />
      </ToggleTrack>
      <Typography
        sx={{
          color: '#4D3019',
          fontWeight: 500,
          fontSize: '0.875rem',
        }}
      >
        {label}
      </Typography>
    </ToggleButton>
  );
};