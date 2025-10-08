import React, { useState } from 'react';
import { Box, styled, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMoreRounded, LinkRounded } from '@mui/icons-material';

interface ConcertinaSection {
  id: string;
  title: string;
  content: string;
}

interface ConcertinaProps {
  sections: ConcertinaSection[];
}

const StyledConcertina = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1), // space-y-2
}));

const StyledSection = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`, // border-gray-200
  borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2, // rounded-lg
  overflow: 'hidden',
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3), // p-3 sm:p-4 md:p-6
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  gap: theme.spacing(2), // gap-2
  '&:hover': {
    backgroundColor: theme.palette.light.main, // hover:bg-[#FDFCEE]
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6),
  },
}));

const StyledTitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3), // sm:gap-3
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2), // gap-2
  },
}));

const StyledTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<{ isHovered: boolean }>(({ theme, isHovered }) => ({
  fontWeight: 700, // font-bold
  fontSize: '1.5rem', // text-2xl
  lineHeight: 1.2, // leading-tight
  color: theme.palette.dark.main, // text-[#4D3019]
  wordBreak: 'break-word', // break-words
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: theme.palette.accent.main, // bg-orange-500
    display: isHovered ? 'block' : 'none',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.25rem', // lg:text-[28px]
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.125rem', // md:text-xl
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem', // sm:text-lg
  },
}));

const StyledLinkButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.accent.main, // text-orange-500
  '&:hover': {
    color: theme.palette.accent.dark || theme.palette.accent.main, // hover:text-orange-600
  },
  padding: 0,
}));

const StyledTooltip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -40, // -top-10
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.grey[900], // bg-gray-900
  color: theme.palette.common.white, // text-white
  fontSize: '0.75rem', // text-xs
  padding: theme.spacing(1, 2), // px-2 py-1
  borderRadius: theme.shape.borderRadius, // rounded
  whiteSpace: 'nowrap',
  zIndex: 10,
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.875rem', // sm:text-sm
    padding: theme.spacing(1.5, 3), // sm:px-3 sm:py-1.5
  },
}));

const StyledChevron = styled(ExpandMoreRounded)(({ theme }) => ({
  color: theme.palette.grey[500], // text-gray-500
  transition: 'transform 0.2s', // transition-transform duration-200
  width: 24, // sm:w-6
  height: 24, // sm:h-6
  [theme.breakpoints.down('sm')]: {
    width: 20,
    height: 20,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3), // px-3 pb-3 pt-2
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 4, 4), // sm:px-4 sm:pb-4
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 6, 6), // md:px-6 md:pb-6
  },
}));

const StyledContentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.dark.main, // text-[#4D3019]
  lineHeight: 1.5, // leading-relaxed
  wordBreak: 'break-word', // break-words
  fontSize: 13, // style={{ fontSize: '13px' }}
}));

export function Concertina({ sections }: ConcertinaProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(id)) {
      newOpenSections.delete(id);
    } else {
      newOpenSections.add(id);
    }
    setOpenSections(newOpenSections);
  };

  const copyJumpLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <StyledConcertina>
      {sections.map((section) => (
        <StyledSection key={section.id} id={section.id}>
          <StyledHeader
            onClick={() => toggleSection(section.id)}
            onMouseEnter={() => setHoveredTitle(section.id)}
            onMouseLeave={() => setHoveredTitle(null)}
          >
            <StyledTitleWrapper>
              <StyledTitle isHovered={hoveredTitle === section.id} variant="h3">
                {section.title}
              </StyledTitle>
              {hoveredTitle === section.id && (
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  <StyledLinkButton
                    onClick={(e) => copyJumpLink(section.id, e)}
                    aria-label="Copy link"
                  >
                    <LinkRounded sx={{fontSize: 20}} />
                  </StyledLinkButton>
                  {copiedId === section.id && (
                    <StyledTooltip>
                      Link copied
                    </StyledTooltip>
                  )}
                </Box>
              )}
            </StyledTitleWrapper>
            <StyledChevron
              sx={{ fontSize:20, transform: openSections.has(section.id) ? 'rotate(180deg)' : 'none' }}
            />
          </StyledHeader>
          <Collapse in={openSections.has(section.id)}>
            <StyledContent>
              <StyledContentText>{section.content}</StyledContentText>
            </StyledContent>
          </Collapse>
        </StyledSection>
      ))}
    </StyledConcertina>
  );
}