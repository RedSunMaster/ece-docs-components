import React from 'react';
import { Box, Typography, IconButton, styled } from '@mui/material';
import { Button } from './Button';
import { ChevronRightRounded, PieChartRounded } from '@mui/icons-material';

interface StatusBarProps {
  itemCount: number;
  variant: 'actionstarted' | 'noaction';
  onTailorClick?: () => void;
  onNextClick?: () => void;
}

const StatusBarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#F5C98E',
  padding: theme.spacing(1.5, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(1.25, 2),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flex: 1,
  minWidth: 0,
  justifyContent: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
}));

const NextButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  border: `2px solid rgba(77, 48, 25, 0.25)`,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#4D3019',
    color: '#fff',
  },
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
}));

export const StatusBar: React.FC<StatusBarProps> = ({
  itemCount,
  variant = 'actionstarted',
  onTailorClick,
  onNextClick
}) => {
  const message = `There are ${itemCount} items that need attention.`;

  return (
    <StatusBarContainer>
      <ContentWrapper>
        <PieChartRounded 
          sx={{
            fontSize: 24,
            color:"#4D3019",
            flexShrink: 0 ,
        }}
        />
        <Typography
          sx={{
            fontSize: { xs: '14px', sm: '15px', md: '16px' },
            color: '#4D3019',
            wordBreak: 'break-word',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {variant === 'actionstarted' ? (
            <>
              <Box component="span" sx={{ fontWeight: 700 }}>Incomplete.</Box> {message}
            </>
          ) : (
            <>
              <Box component="span" sx={{ fontWeight: 700 }}>Not started.</Box> {message}
            </>
          )}
        </Typography>
      </ContentWrapper>
      {variant === 'actionstarted' ? (
        <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
          <NextButton
            onClick={onNextClick}
            aria-label="Next"
          >
            <ChevronRightRounded sx={{fontSize:20}} />
          </NextButton>
        </Box>
      ) : (
        <Box sx={{ flexShrink: 0 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onTailorClick}
          >
            Tailor policies
          </Button>
        </Box>
      )}
    </StatusBarContainer>
  );
};