import React from 'react';
import { Box, styled, Typography, TextField, IconButton } from '@mui/material';
import { useTheme } from '../ThemeProvider';
import { SchoolRounded, SearchRounded } from '@mui/icons-material';

interface HeaderProps {
  userName?: string;
  userInitials?: string;
}

const StyledHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 4), // px-4 py-3
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2), // gap-2
  backgroundColor: theme.palette.primary.main, // var(--color-primary)
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 6), // sm:px-6
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 8), // md:px-8
    gap: theme.spacing(4), // md:gap-4
  },
}));

const StyledLogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2), // md:gap-2
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(1.5), // gap-1.5
  },
}));

const StyledLogoIcon = styled(Box)(({ theme }) => ({
  width: 32, // md:w-8 md:h-8
  height: 32,
  color: theme.palette.light.main, // text-[#FDFCEE]
  [theme.breakpoints.down('md')]: {
    width: 24, // w-6
    height: 24, // h-6
  },
}));

const StyledLogoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.light.main, // text-[#FDFCEE]
  fontWeight: 700, // font-bold
  letterSpacing: '0.05em', // tracking-wide
  fontSize: '1.5rem', // text-2xl
  [theme.breakpoints.down('md')]: {
    fontSize: '1.25rem', // sm:text-xl
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem', // text-lg
  },
}));

const StyledSearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '32rem', // max-w-2xl
  margin: theme.spacing(0, 8), // mx-8
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 4), // sm:mx-4
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 2), // mx-2
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.light.main, // bg-[#FDFCEE]
    color: theme.palette.dark.main, // text-[#4D3019]
    borderRadius: '9999px', // rounded-full
    paddingRight: theme.spacing(6), // pr-12
    fontSize: '1rem', // text-base
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(5), // sm:pr-10
      fontSize: '0.875rem', // text-sm
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 3), // px-4 py-2
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5, 4), // md:px-6 md:py-3
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5, 2.5), // sm:px-5
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: `${theme.palette.dark.main}99`, // placeholder-[#4D3019]/60
    opacity: 1,
  },
  '& .MuiInputBase-root:focus-within': {
    outline: `2px solid ${theme.palette.light.main}`, // focus:ring-2 focus:ring-[#FDFCEE]
    outlineOffset: 0,
  },
}));

const StyledSearchButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2), // md:right-2
  top: '50%',
  transform: 'translateY(-50%)',
  width: theme.spacing(5), // md:w-10
  height: theme.spacing(5), // md:h-10
  borderRadius: '50%', // rounded-full
  backgroundColor: theme.palette.primary.main, // var(--color-primary)
  '&:hover': {
    opacity: 0.9, // hover:opacity-90
    backgroundColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    right: theme.spacing(1), // right-1
    width: theme.spacing(4), // w-8
    height: theme.spacing(4), // h-8
  },
}));

const StyledSearchIcon = styled(Box)(({ theme }) => ({
  width: 20, // md:w-5 md:h-5
  height: 20,
  color: theme.palette.light.main, // text-[#FDFCEE]
  [theme.breakpoints.down('md')]: {
    width: 16, // w-4
    height: 16, // h-4
  },
}));

const StyledUserContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3), // md:gap-3
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2), // gap-2
  },
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
  width: theme.spacing(6), // md:w-12
  height: theme.spacing(6), // md:h-12
  borderRadius: '50%', // rounded-full
  backgroundColor: theme.palette.light.main, // bg-[#FDFCEE]
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: theme.spacing(5), // sm:w-10
    height: theme.spacing(5), // sm:h-10
  },
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(4), // w-8
    height: theme.spacing(4), // h-8
  },
}));

const StyledAvatarText = styled(Typography)(({ theme }) => ({
  color: theme.palette.dark.main, // text-[#4D3019]
  fontWeight: 700, // font-bold
  fontSize: '1.125rem', // text-lg
  [theme.breakpoints.down('md')]: {
    fontSize: '0.875rem', // text-sm
  },
}));

const StyledUserName = styled(Typography)(({ theme }) => ({
  color: theme.palette.light.main, // text-[#FDFCEE]
  fontWeight: 500, // font-medium
  fontSize: '1.125rem', // text-lg
  display: 'none', // hidden
  [theme.breakpoints.up('sm')]: {
    display: 'inline', // sm:inline
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.875rem', // text-sm
  },
}));

export const Header: React.FC<HeaderProps> = ({
  userName = 'John Doe',
  userInitials = 'JD',
}) => {
  const { theme } = useTheme();

  return (
    <StyledHeader>
      <StyledLogoWrapper>
        <StyledLogoIcon>
          <SchoolRounded sx={{fontSize:32, color: 'currentColor'}} />
        </StyledLogoIcon>
        <StyledLogoText variant="h1">{theme.appName}</StyledLogoText>
      </StyledLogoWrapper>

      <StyledSearchContainer>
        <StyledTextField
          placeholder="Search for a policy"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <StyledSearchButton>
                <StyledSearchIcon>
                  <SearchRounded sx={{fontSize: 20}} />
                </StyledSearchIcon>
              </StyledSearchButton>
            ),
          }}
        />
      </StyledSearchContainer>

      <StyledUserContainer>
        <StyledAvatar>
          <StyledAvatarText>{userInitials}</StyledAvatarText>
        </StyledAvatar>
        <StyledUserName>{userName}</StyledUserName>
      </StyledUserContainer>
    </StyledHeader>
  );
};