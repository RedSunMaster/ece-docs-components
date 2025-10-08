import React, { useState } from 'react';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';

interface ReadByProps {
  names: string[];
}

const ReadByContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '0 8px 8px 0',
  backgroundColor: theme.palette.custom?.readByBackgroundColor || theme.palette.accent.main,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(1.5),
  },
}));

const ExpandButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: '#4d3019',
  color: '#fff',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#4d3019',
    opacity: 0.8,
  },
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'flex-end',
  },
}));

export const ReadBy: React.FC<ReadByProps> = ({ names }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? names.join(', ')
    : names.length > 5
      ? `${names.slice(0, 5).join(', ')}...`
      : names.join(', ');

  return (
    <ReadByContainer>
      <Box sx={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
        <Typography
          component="span"
          sx={{
            fontSize: { xs: '13px', sm: '14px' },
            fontWeight: 700,
            color: theme.palette.dark.main,
          }}
        >
          Read by:
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: { xs: '13px', sm: '14px' },
            color: theme.palette.dark.main,
            ml: 1,
          }}
        >
          {displayText}
        </Typography>
      </Box>
      {names.length > 5 && (
        <ExpandButton
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          size="small"
        >
          {isExpanded ? (
            <ExpandLessRounded sx={{fontSize: 16}} />
          ) : (
            <ExpandMoreRounded sx={{fontSize: 16}} />
          )}
        </ExpandButton>
      )}
    </ReadByContainer>
  );
};