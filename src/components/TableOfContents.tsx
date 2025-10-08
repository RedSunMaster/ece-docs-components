import React from 'react';
import { Box, Typography, Link, styled } from '@mui/material';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection?: string;
}

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    right: 0,
    top: 0,
    width: '224px',
    float: 'right',
    marginLeft: theme.spacing(1.5),
    marginBottom: 0,
  },
  [theme.breakpoints.up('lg')]: {
    width: '256px',
    marginLeft: theme.spacing(2),
  },
  marginBottom: theme.spacing(2),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#FEFDF7',
  borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
  padding: theme.spacing(2.5),
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const NavLink = styled(Link)<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: 'block',
  padding: theme.spacing(1, 2),
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: '#4D3019',
  transition: 'background-color 0.2s',
  borderLeft: isActive ? '4px solid #FFC365' : '4px solid transparent',
  backgroundColor: isActive ? '#FFEDD1' : 'transparent',
  fontWeight: isActive ? 700 : 400,
  '&:hover': {
    backgroundColor: '#FFEDD1',
  },
}));

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSection = 'current-section',
}) => {
  return (
    <Container>
      <ContentBox>
        <Typography
          variant="h6"
          sx={{
            color: '#4D3019',
            fontWeight: 600,
            fontSize: '16px',
            mb: 3,
          }}
        >
          In this policy
        </Typography>
        <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          {sections.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <NavLink
                key={section.id}
                href={`#${section.id}`}
                isActive={isActive}
              >
                {section.title}
              </NavLink>
            );
          })}
        </Box>
      </ContentBox>
    </Container>
  );
};