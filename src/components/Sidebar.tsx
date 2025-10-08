import React, { useState } from 'react';
import { Box, IconButton, Typography, List, ListItemButton, ListItemText, Collapse, styled } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { ChevronLeftRounded, ChevronRightRounded, ExpandLessRounded, ExpandMoreRounded, HelpOutlineRounded, HomeRounded, TextSnippetRounded } from '@mui/icons-material';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  centreName?: string;
  activePage?: string;
  onPageChange?: (pageId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasChildren?: boolean;
  children?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  hasChildren?: boolean;
  children?: string[];
}

const SidebarContainer = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  height: '100vh',
  position: 'sticky',
  top: 0,
  backgroundColor: '#fff',
  borderRight: `1px solid ${theme.palette.dark.main}1A`,
  flexShrink: 0,
  transition: 'all 0.3s ease-in-out',
  width: isOpen ? '288px' : '64px',
  zIndex: 50,
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    left: isOpen ? 0 : '-288px',
    width: '288px',
  },
  [theme.breakpoints.up('sm')]: {
    width: isOpen ? '288px' : '80px',
  },
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#4D3019',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#3d2614',
  },
}));

const MenuItemButton = styled(ListItemButton)<{ isActive?: boolean; isOpen: boolean }>(({ theme, isActive, isOpen }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: isOpen ? '10px 8px' : '12px 0',
  justifyContent: isOpen ? 'flex-start' : 'center',
  gap: isOpen ? theme.spacing(1) : 0,
  '&:hover': {
    backgroundColor: `${theme.palette.dark.main}0D`,
  },
  ...(isActive && {
    backgroundColor: `${theme.palette.dark.main}1A`,
  }),
}));

const IconWrapper = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: isOpen ? 32 : 40,
  height: isOpen ? 32 : 40,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: theme.palette.custom?.iconColor || theme.palette.accent.main,
}));

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  centreName = "Centre name goes here \n across two lines",
  activePage = 'dashboard',
  onPageChange
}) => {
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [expandedSubItems, setExpandedSubItems] = useState<string[]>([]);

  const handlePageClick = (pageId: string) => {
    if (onPageChange) {
      onPageChange(pageId);
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <HomeRounded sx={{fontSize: 20, color:"#4D3019"}} />,
    },
    {
      id: 'policies',
      label: 'Policies',
      icon: <TextSnippetRounded sx={{fontSize: 20, color:"#4D3019"}} />,
      hasChildren: true,
      children: [
        { id: 'legislation', label: 'Legislation' },
        { id: 'service-assurances', label: 'Service Assurances / Compliance Checklist' },
        {
          id: 'governance',
          label: 'Governance, Management, and Administration',
          hasChildren: true,
          children: [
            'Philosophy and Values',
            'Te Tiriti o Waitangi – policy options',
            'Self-Review and Internal Evaluation',
          ],
        },
        {
          id: 'curriculum',
          label: 'Curriculum and Learning V1',
          hasChildren: true,
          children: [],
        },
      ],
    },
    {
      id: 'support',
      label: 'Support',
      icon: <HelpOutlineRounded sx={{fontSize: 20, color:"#4D3019"}} />,
    },
  ];

  const toggleItem = (itemId: string) => {
    if (!isOpen) {
      onToggle();
      setExpandedItems([itemId]);
    } else {
      setExpandedItems((prev) =>
        prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      );
    }
  };

  const toggleSubItem = (subItemId: string) => {
    setExpandedSubItems((prev) =>
      prev.includes(subItemId) ? prev.filter((id) => id !== subItemId) : [...prev, subItemId]
    );
  };

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: { xs: 'block', md: 'none' },
          }}
          onClick={onToggle}
        />
      )}
      <SidebarContainer isOpen={isOpen}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {isOpen && (
            <Box
              sx={{
                px: 2,
                py: 3,
                borderBottom: `1px solid ${theme.palette.dark.main}1A`,
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#4D3019',
                  lineHeight: 1.3,
                  whiteSpace: 'pre-line',
                  pr: 7,
                }}
              >
                {centreName}
              </Typography>

              <ToggleButton
                onClick={onToggle}
                sx={{ position: 'absolute', top: 24, right: 16 }}
                aria-label="Collapse sidebar"
              >
                <ChevronLeftRounded sx={{fontSize: 20}} />
              </ToggleButton>
            </Box>
          )}

          {!isOpen && (
            <Box
              sx={{
                px: 1,
                py: 3,
                borderBottom: `1px solid ${theme.palette.dark.main}1A`,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ToggleButton onClick={onToggle} aria-label="Expand sidebar">
                <ChevronRightRounded sx={{fontSize: 20}} />
              </ToggleButton>
            </Box>
          )}

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: isOpen ? 1.5 : 1,
              py: 3,
            }}
          >
            <List sx={{ p: 0 }}>
              {menuItems.map((item) => (
                <Box key={item.id} sx={{ mb: 1 }}>
                  <MenuItemButton
                    isOpen={isOpen}
                    isActive={activePage === item.id}
                    onClick={() => {
                      if (item.hasChildren) {
                        toggleItem(item.id);
                      } else {
                        if (!isOpen) {
                          onToggle();
                        }
                        handlePageClick(item.id);
                      }
                    }}
                    title={!isOpen ? item.label : undefined}
                  >
                    <IconWrapper isOpen={isOpen}>{item.icon}</IconWrapper>
                    {isOpen && (
                      <>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: '1rem',
                            fontWeight: 600,
                          }}
                          sx={{ flex: 1 }}
                        />
                        {item.hasChildren && (
                          <Box>
                            {expandedItems.includes(item.id) ? (
                              <ExpandLessRounded sx={{fontSize: 20, color:"#4D3019"}} />
                            ) : (
                              <ExpandMoreRounded sx={{fontSize: 20, color:"#4D3019"}} />
                            )}
                          </Box>
                        )}
                      </>
                    )}
                  </MenuItemButton>

                  {item.hasChildren && expandedItems.includes(item.id) && item.children && isOpen && (
                    <Collapse in={true} timeout="auto">
                      <List sx={{ p: 0, mt: 0.5 }}>
                        {item.children.map((subItem) => (
                          <Box key={subItem.id}>
                            <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                              <ListItemButton
                                onClick={() => handlePageClick(subItem.id)}
                                sx={{
                                  flex: 1,
                                  pl: 8,
                                  py: 1.25,
                                  borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
                                  '&:hover': {
                                    backgroundColor: `${theme.palette.dark.main}0D`,
                                  },
                                  ...(activePage === subItem.id && {
                                    backgroundColor: `${theme.palette.dark.main}1A`,
                                  }),
                                }}
                              >
                                <ListItemText
                                  primary={subItem.label}
                                  primaryTypographyProps={{
                                    fontSize: '0.875rem',
                                  }}
                                />
                              </ListItemButton>
                              {subItem.hasChildren && subItem.children && subItem.children.length > 0 && (
                                <IconButton
                                  onClick={() => toggleSubItem(subItem.id)}
                                  sx={{
                                    px: 1,
                                    borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
                                    '&:hover': {
                                      backgroundColor: `${theme.palette.dark.main}0D`,
                                    },
                                  }}
                                >
                                  <ChevronRightRounded
                                    sx={{
                                      fontSize: 16,
                                      color: '#4D3019',
                                      transition: 'transform 0.2s',
                                      transform: expandedSubItems.includes(subItem.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                                    }}
                                  />
                                </IconButton>
                              )}
                            </Box>

                            {subItem.hasChildren && expandedSubItems.includes(subItem.id) && subItem.children && (
                              <Collapse in={true} timeout="auto">
                                <List sx={{ p: 0, mt: 0.5 }}>
                                  {subItem.children.map((nestedItem, index) => {
                                    const nestedPageId = `${subItem.id}-${index}`;
                                    return (
                                      <ListItemButton
                                        key={index}
                                        onClick={() => handlePageClick(nestedPageId)}
                                        sx={{
                                          pl: 10,
                                          py: 1,
                                          borderRadius: theme.shape.borderRadius,
                                          '&:hover': {
                                            backgroundColor: `${theme.palette.dark.main}0D`,
                                          },
                                          ...(activePage === nestedPageId && {
                                            backgroundColor: `${theme.palette.dark.main}1A`,
                                          }),
                                        }}
                                      >
                                        <ListItemText
                                          primary={nestedItem}
                                          primaryTypographyProps={{
                                            fontSize: '0.875rem',
                                          }}
                                        />
                                      </ListItemButton>
                                    );
                                  })}
                                </List>
                              </Collapse>
                            )}
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      </SidebarContainer>
    </>
  );
};