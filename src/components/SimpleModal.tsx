import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, styled } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { CloseRounded } from '@mui/icons-material';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
    maxWidth: '448px',
    width: '100%',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: '1.125rem',
  fontWeight: 600,
  color: theme.palette.dark.main,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: `${theme.palette.dark.main}0D`,
  },
}));

export const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <StyledDialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>
        {title}
        <CloseButton onClick={onClose} aria-label="Close">
          <CloseRounded sx={{fontSize:20, color:theme.palette.dark.main}} />
        </CloseButton>
      </StyledDialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
    </StyledDialog>
  );
};