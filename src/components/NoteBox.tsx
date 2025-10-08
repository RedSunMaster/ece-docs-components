import React, { useState } from 'react';
import { Box, Typography, IconButton, styled } from '@mui/material';
import { EditRounded } from '@mui/icons-material';

interface NoteBoxProps {
  variant?: 'default' | 'mandatory' | 'optional' | 'pending' | 'accepted' | 'action-required' | 'custom';
  label?: string;
  children: React.ReactNode;
  className?: string;
  onEditClick?: () => void;
}

const NoteContainer = styled(Box)({
  position: 'relative',
  maxWidth: '100%',
});

const EditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -4,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 24,
  height: 24,
  backgroundColor: '#4D3019',
  opacity: 0,
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  '&:hover': {
    backgroundColor: '#4D3019',
    transform: 'translateY(-50%) scale(1.1)',
  },
}));

const HighlightWrapper = styled(Box)<{ 
  isHovered: boolean; 
  highlightColor: string; 
  highlightSelectedColor: string;
  isCustom: boolean;
}>(({ isHovered, highlightColor, highlightSelectedColor, isCustom }) => ({
  position: 'relative',
  display: 'inline-block',
  maxWidth: '100%',
  '&:hover .edit-button': {
    opacity: 1,
  },
  '& .highlight-span': {
    background: isCustom ? highlightColor : (isHovered ? highlightSelectedColor : highlightColor),
    padding: '2px 4px',
    boxDecorationBreak: 'clone',
    WebkitBoxDecorationBreak: 'clone',
    transition: isCustom ? 'none' : 'background 0.2s ease',
    cursor: isCustom ? 'default' : 'pointer',
    fontSize: '13px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    display: 'inline',
    color: '#4D3019',
  },
}));

export const NoteBox: React.FC<NoteBoxProps> = ({
  variant = 'default',
  label,
  children,
  className = '',
  onEditClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: {
      highlight: '#FFEACD',
      highlightSelected: '#FFC365',
      label: '',
      labelColor: '',
    },
    mandatory: {
      highlight: '#FFEACD',
      highlightSelected: '#FFC365',
      label: 'Not Answered (Mandatory)',
      labelColor: 'var(--color-secondary)',
    },
    optional: {
      highlight: '#FFF6D1',
      highlightSelected: '#FDE58E',
      label: 'Not Answered (Optional)',
      labelColor: 'var(--color-secondary)',
    },
    pending: {
      highlight: '#F5E2FF',
      highlightSelected: '#EBC7FF',
      label: 'Pending',
      labelColor: 'var(--color-secondary)',
    },
    accepted: {
      highlight: '#EDF9CD',
      highlightSelected: '#DBF59A',
      label: 'Accepted',
      labelColor: '#2D5016',
    },
    'action-required': {
      highlight: '#FBEEEE',
      highlightSelected: '#FFBCB3',
      label: 'Action required before approval',
      labelColor: '#CC0000',
    },
    custom: {
      highlight: '#D9EDF8',
      highlightSelected: '#B3E0F2',
      label: 'Custom Text',
      labelColor: 'var(--color-secondary)',
    },
  };

  const style = variants[variant];
  const displayLabel = label || style.label;

  return (
    <NoteContainer className={className}>
      {displayLabel && (
        <Box sx={{ mb: 1 }}>
          <Typography
            component="span"
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: style.labelColor || 'rgba(0, 0, 0, 0.6)',
            }}
          >
            {displayLabel}
          </Typography>
        </Box>
      )}
      <HighlightWrapper
        isHovered={isHovered}
        highlightColor={style.highlight}
        highlightSelectedColor={style.highlightSelected}
        isCustom={variant === 'custom'}
        onMouseEnter={() => variant !== 'custom' && setIsHovered(true)}
        onMouseLeave={() => variant !== 'custom' && setIsHovered(false)}
      >
        <span className="highlight-span">
          {children}
        </span>
        <EditButton
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            if (onEditClick) {
              onEditClick();
            }
          }}
          title="Edit variable highlight"
          size="small"
        >
          <EditRounded sx={{fontSize:14, color:"#FFFFFF", strokeWidth:2}} />
        </EditButton>
      </HighlightWrapper>
    </NoteContainer>
  );
};