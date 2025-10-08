import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert as MuiAlert,
  Chip,
  styled,
} from '@mui/material';
import { Button } from './Button';
import { ChevronLeftRounded, ChevronRightRounded, CloseRounded, ErrorOutlineRounded, StickyNote2Rounded } from '@mui/icons-material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'mandatory' | 'optional' | 'accepted' | 'action-required' | 'action-required-note' | 'accepted-note';
  description: string;
  defaultText: string;
  note?: string;
  acceptSuggestion?: boolean;
  onAcceptSuggestionChange?: (checked: boolean) => void;
  onSave?: () => void;
  onSubmit?: () => void;
  onDeclineWording?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  currentPage?: number;
  totalPages?: number;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    maxWidth: '896px',
    width: '100%',
    maxHeight: '90vh',
  },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  width: '40px',
  height: '40px',
  border: `2px solid ${theme.palette.dark.main}`,
  backgroundColor: theme.palette.light.main,
  '&:hover': {
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.light.main,
  },
}));

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  status,
  description,
  defaultText,
  note,
  acceptSuggestion: initialAcceptSuggestion = true,
  onAcceptSuggestionChange,
  onSave,
  onSubmit,
  onDeclineWording,
  onPrevious,
  onNext,
  currentPage = 1,
  totalPages = 1,
}) => {
  const [textValue, setTextValue] = useState(defaultText);
  const [acceptSuggestion, setAcceptSuggestion] = useState(initialAcceptSuggestion);

  const handleAcceptSuggestionChange = (checked: boolean) => {
    setAcceptSuggestion(checked);
    onAcceptSuggestionChange?.(checked);
  };

  const statusConfig = {
    mandatory: {
      color: '#F5A623',
      label: 'Mandatory',
    },
    optional: {
      color: '#F5D76E',
      label: 'Optional',
    },
    accepted: {
      color: '#A3D977',
      label: 'Accepted',
    },
    'action-required': {
      color: '#F56B6B',
      label: 'Action Required',
    },
    'action-required-note': {
      color: '#F56B6B',
      label: 'Action Required',
    },
    'accepted-note': {
      color: '#A3D977',
      label: 'Accepted',
    },
  };

  const statusStyle = statusConfig[status];

  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        <CloseRounded sx={{fontSize:24}} />
      </IconButton>

      <DialogContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
        <Box sx={{ mb: 3 }}>
          <Chip
            label={statusStyle.label}
            sx={{
              backgroundColor: statusStyle.color,
              color: status === 'optional' ? '#4D3019' : '#fff',
              fontWeight: 600,
              fontSize: '0.875rem',
              height: 'auto',
              py: 1,
              px: 2,
            }}
          />
        </Box>

        <Typography sx={{ mb: 3, lineHeight: 1.6 }}>
          {description}
        </Typography>

        {status === 'action-required-note' && note && (
          <MuiAlert
            icon={<ErrorOutlineRounded sx={{fontSize:20}} />}
            severity="error"
            sx={{
              mb: 2,
              backgroundColor: '#FFE6E6',
              borderLeft: '4px solid #F56B6B',
              '& .MuiAlert-icon': {
                color: '#F56B6B',
              },
              '& .MuiAlert-message': {
                color: '#4D3019',
              },
            }}
          >
            {note}
          </MuiAlert>
        )}

        {status === 'accepted-note' && note && (
          <MuiAlert
            icon={<StickyNote2Rounded sx={{fontSize:20}} />}
            severity="warning"
            sx={{
              mb: 2,
              backgroundColor: '#FFF9E6',
              borderLeft: '4px solid #F5D76E',
              '& .MuiAlert-icon': {
                color: '#F5A623',
              },
              '& .MuiAlert-message': {
                color: '#4D3019',
              },
            }}
          >
            {note}
          </MuiAlert>
        )}

        <TextField
          multiline
          rows={4}
          fullWidth
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          disabled={acceptSuggestion}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: acceptSuggestion ? 'rgba(0, 0, 0, 0.05)' : '#fff',
            },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button onClick={onSave} variant="secondary" size="md">
              Save
            </Button>
            <Button onClick={onSubmit} variant="primary" size="md">
              Submit for review
            </Button>
            <Button onClick={onDeclineWording} variant="danger" size="md">
              Decline Wording
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
            }}
          >
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <NavButton onClick={onPrevious} aria-label="Previous">
                <ChevronLeftRounded sx={{fontSize:20}} />
              </NavButton>
              <NavButton onClick={onNext} aria-label="Next">
                <ChevronRightRounded sx={{fontSize:20}} />
              </NavButton>
            </Box>
            <Typography fontWeight={500} fontSize="1.125rem" sx={{ ml: 1 }}>
              {currentPage}/{totalPages}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};