import React, { useState } from 'react';
import { Box, Button, Collapse, styled } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

const TabsContainer = styled(Box)({
  display: 'none',
  '@media (min-width: 900px)': {
    display: 'block',
  },
});

const TabButtonsWrapper = styled(Box)({
  display: 'flex',
  gap: '4px',
  backgroundColor: '#FDFCEE',
});

const TabButton = styled(Button)<{ isActive: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(2, 3),
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'none',
  color: isActive ? '#4D3019' : '#826E5C',
  backgroundColor: isActive ? theme.palette.custom?.tabBackgroundColor || theme.palette.accent.main : 'transparent',
  borderRadius: 0,
  position: 'relative',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: isActive ? theme.palette.custom?.tabBackgroundColor || theme.palette.accent.main : 'rgba(77, 48, 25, 0.05)',
    color: '#4D3019',
  },
  '&::after': isActive ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: theme.palette.primary.main,
  } : {},
}));

const TabContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  color: '#4D3019',
  backgroundColor: theme.palette.custom?.tabBackgroundColor || theme.palette.accent.main,
}));

const MobileContainer = styled(Box)({
  backgroundColor: '#FDFCEE',
  '@media (min-width: 900px)': {
    display: 'none',
  },
});

const MobileTabButton = styled(Button)<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2),
  textAlign: 'left',
  textTransform: 'none',
  borderRadius: 0,
  backgroundColor: isExpanded ? theme.palette.custom?.tabBackgroundColor || theme.palette.accent.main : 'transparent',
  '&:hover': {
    backgroundColor: isExpanded ? theme.palette.custom?.tabBackgroundColor || theme.palette.accent.main : 'rgba(77, 48, 25, 0.05)',
  },
}));

const MobileTabContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2, 3, 2),
  color: '#4D3019',
  backgroundColor: theme.palette.custom?.tabBackgroundColor || theme.palette.accent.main,
}));

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<string | null>(null);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  const handleMobileTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileExpandedTab(mobileExpandedTab === tabId ? null : tabId);
  };

  return (
    <>
      {/* Desktop View */}
      <TabsContainer>
        <TabButtonsWrapper>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              isActive={activeTab === tab.id}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabButtonsWrapper>
        <TabContent>
          {activeTabContent}
        </TabContent>
      </TabsContainer>

      {/* Mobile View - Accordion */}
      <MobileContainer>
        {tabs.map((tab, index) => (
          <Box
            key={tab.id}
            sx={{
              borderTop: index !== 0 ? '2px solid #e5e7eb' : 'none',
            }}
          >
            <MobileTabButton
              onClick={() => handleMobileTabClick(tab.id)}
              isExpanded={mobileExpandedTab === tab.id}
            >
              <Box
                component="span"
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: activeTab === tab.id ? '#4D3019' : '#826E5C',
                }}
              >
                {tab.label}
              </Box>
              <ExpandMoreRounded
                sx={{
                  fontSize: 20,
                  color: activeTab === tab.id ? '#4D3019' : '#826E5C',
                  transform: mobileExpandedTab === tab.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </MobileTabButton>
            <Collapse in={mobileExpandedTab === tab.id}>
              <MobileTabContent>
                {tab.content}
              </MobileTabContent>
            </Collapse>
          </Box>
        ))}
      </MobileContainer>
    </>
  );
};