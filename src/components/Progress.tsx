import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';
import { useTheme } from '../ThemeProvider';

interface ProgressProps {
  current: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 9999,
  backgroundColor: `${theme.palette.dark.main}1A`,
  '& .MuiLinearProgress-bar': {
    borderRadius: 9999,
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.3s ease-out',
  },
}));

export const Progress: React.FC<ProgressProps> = ({
  current,
  total,
  showLabel = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <Box className={className}>
      {showLabel && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            Step {current} of {total}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.round(percentage)}%
          </Typography>
        </Box>
      )}
      <StyledLinearProgress variant="determinate" value={percentage} />
    </Box>
  );
};

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const StepNumber = styled(Box)<{ isActive: boolean; isCompleted: boolean }>(
  ({ theme, isActive, isCompleted }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    backgroundColor: isCompleted || isActive 
      ? theme.palette.primary.main 
      : `${theme.palette.dark.main}1A`,
    color: isCompleted || isActive 
      ? (theme.palette.custom?.stepIndicatorTextColor || theme.palette.dark.main)
      : `${theme.palette.dark.main}99`,
    boxShadow: isActive ? `0 0 0 4px ${theme.palette.primary.main}33` : 'none',
    [theme.breakpoints.down('sm')]: {
      width: 32,
      height: 32,
      fontSize: '0.75rem',
    },
  })
);

const StepLine = styled(Box)<{ isCompleted: boolean }>(({ theme, isCompleted }) => ({
  flex: 1,
  height: 4,
  borderRadius: 2,
  margin: '0 8px',
  minWidth: '1rem',
  transition: 'background-color 0.2s',
  backgroundColor: isCompleted ? theme.palette.primary.main : `${theme.palette.dark.main}1A`,
  [theme.breakpoints.down('sm')]: {
    height: 2,
    margin: '0 4px',
  },
}));

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  const { theme } = useTheme();

  return (
    <Box 
      className={className}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        overflowX: 'auto',
        pb: 1,
      }}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <StepNumber isActive={isActive} isCompleted={isCompleted}>
                {stepNumber}
              </StepNumber>
              <Typography
                sx={{
                  mt: { xs: 0.5, sm: 1 },
                  fontSize: { xs: '10px', sm: '12px' },
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  color: isActive ? theme.palette.primary.main : `${theme.palette.dark.main}99`,
                }}
              >
                {step}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <StepLine isCompleted={isCompleted} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};