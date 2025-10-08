import React, { useState } from 'react';
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography, IconButton, Menu, MenuItem, styled } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { HomeRounded, ExpandMoreRounded } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentItem: string;
  dropdownItems?: string[];
  onItemSelect?: (item: string) => void;
}

const HomeButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
  backgroundColor: theme.palette.custom?.iconColor || theme.palette.accent.main,
  flexShrink: 0,
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  '&:hover': {
    backgroundColor: theme.palette.custom?.iconColor || theme.palette.accent.main,
    opacity: 0.8,
  },
}));

const DropdownButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 2),
  borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
  border: `1px solid ${theme.palette.dark.main}33`,
  backgroundColor: '#fff',
  color: theme.palette.dark.main,
  fontWeight: 500,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
  fontSize: '0.875rem',
  '&:hover': {
    borderColor: `${theme.palette.dark.main}4D`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 1),
    gap: theme.spacing(0.5),
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    width: '256px',
    borderRadius: (typeof theme.shape.borderRadius === 'string'
  ? parseInt(theme.shape.borderRadius, 10)
  : theme.shape.borderRadius || 4) * 2,
    border: `1px solid ${theme.palette.dark.main}33`,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
}));

const StyledMenuItem = styled(MenuItem)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(1.25, 2),
  fontSize: '0.875rem',
  color: isActive ? theme.palette.primary.main : '#4D3019',
  fontWeight: isActive ? 500 : 400,
  backgroundColor: isActive ? '#F5F1ED' : 'transparent',
  '&:hover': {
    backgroundColor: '#F5F1ED',
  },
}));

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  currentItem,
  dropdownItems = [],
  onItemSelect,
}) => {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDropdownOpen = Boolean(anchorEl);

  const handleDropdownToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: string) => {
    onItemSelect?.(item);
    handleClose();
  };

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.5, sm: 1 },
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        overflow: 'visible',
      }}
    >
      <HomeButton aria-label="Home">
        <HomeRounded sx={{ fontSize: 20, color:"#4D3019"}} />
      </HomeButton>

      <MuiBreadcrumbs
        separator="/"
        sx={{
          display: { xs: 'none', md: 'flex' },
          '& .MuiBreadcrumbs-separator': {
            color: `${theme.palette.dark.main}66`,
          },
        }}
      >
        {items.map((item, index) => (
          <Typography
            key={index}
            sx={{
              color: theme.palette.dark.main,
              fontWeight: 500,
              px: { xs: 0.5, sm: 1 },
              whiteSpace: 'nowrap',
              fontSize: 'inherit',
            }}
          >
            {item.label}
          </Typography>
        ))}
      </MuiBreadcrumbs>

      <Typography
        sx={{
          display: { xs: 'none', md: 'inline' },
          color: `${theme.palette.dark.main}66`,
        }}
      >
        /
      </Typography>

      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <DropdownButton
          type="button"
          onClick={handleDropdownToggle}
        >
          <span>{currentItem}</span>
          <ExpandMoreRounded
            sx={{
              fontSize: 20,
              transition: 'transform 0.2s',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </DropdownButton>

        {dropdownItems.length > 0 && (
          <StyledMenu
            anchorEl={anchorEl}
            open={isDropdownOpen}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {dropdownItems.map((item, index) => (
              <StyledMenuItem
                key={index}
                onClick={() => handleItemClick(item)}
                isActive={item === currentItem}
              >
                {item}
              </StyledMenuItem>
            ))}
          </StyledMenu>
        )}
      </Box>
    </Box>
  );
};