import React, { useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { AddRounded, CloseRounded } from '@mui/icons-material';

interface DefinitionBoxProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

const StyledWrapper = styled(Box)(({ theme }) => ({
  // No specific wrapper styles needed, just a container
}));

const StyledParagraph = styled(Typography)(({ theme }) => ({
  fontSize: '14px', // text-[14px]
  color: theme.palette.dark.main, // text-[#4D3019]
  display: 'inline-flex',
  alignItems: 'center',
}));

const StyledTermWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginLeft: theme.spacing(0.5), // ml-1
}));

const StyledTerm = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  paddingBottom: '1px', // style={{ paddingBottom: '1px' }}
  borderBottom: `2px solid ${isOpen ? theme.palette.secondary.main : theme.palette.dark.main}`, // border-b-2
  transition: 'border-bottom-color 0.2s', // transition-colors
  '&:hover': {
    borderBottomColor: theme.palette.secondary.main, // hover effect
  },
}));

const StyledIconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(0.5), // ml-1
  transition: 'color 0.2s', // transition-colors
}));

const StyledDefinitionBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2), // mt-4
  padding: theme.spacing(2), // p-4
  borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2, // rounded-lg
  border: `1px solid ${theme.palette.dark.main}33`, // border-[#4D3019]/20
  borderRight: `4px solid ${theme.palette.dark.main}33`, // border-r-4
  backgroundColor: theme.palette.light.main, // style={{ backgroundColor: '#FDFCEE' }}
}));

const StyledDefinitionText = styled(Typography)(({ theme }) => ({
  fontSize: '14px', // text-[14px]
  color: theme.palette.dark.main, // text-[#4D3019]
  lineHeight: 1.5, // leading-relaxed
}));

export function DefinitionBox({ term, definition, children }: DefinitionBoxProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledParagraph>
        {children}
        <StyledTermWrapper onClick={() => setIsOpen(!isOpen)}>
          <StyledTerm
            isOpen={isOpen}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = theme.palette.secondary.main)}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = isOpen ? theme.palette.secondary.main : theme.palette.dark.main)}
          >
            {term}
          </StyledTerm>
          <StyledIconWrapper>
            {isOpen ? (
              <CloseRounded
                sx={{
                  fontSize: 16,
                  color: isOpen ? theme.palette.secondary.main : theme.palette.dark.main,
                  '&:hover': {
                    color: theme.palette.secondary.main
                  }
                }}
              />
            ) : (
              <AddRounded
                sx={{
                  fontSize: 16,
                  color: theme.palette.dark.main,
                  '&:hover': {
                    color: theme.palette.secondary.main
                  }
                }}
              />
            )}
          </StyledIconWrapper>
        </StyledTermWrapper>
      </StyledParagraph>
      {isOpen && (
        <StyledDefinitionBox>
          <StyledDefinitionText>{definition}</StyledDefinitionText>
        </StyledDefinitionBox>
      )}
    </StyledWrapper>
  );
}