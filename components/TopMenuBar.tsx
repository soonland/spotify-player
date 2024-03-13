'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Drawer, InputBase, List, ListItem, alpha, styled } from '@mui/material';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { FC, ReactElement, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { signOut, useSession } from 'next-auth/react';
import { AccountCircle } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const TopMenuBar: FC = (): ReactElement => {
  const session = useSession();

  const { t } = useTranslation("common");

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const fetcher = (url: string, { arg }: { arg: { artist: string } }) => fetch(`${url}/${arg.artist}`).then(res => res.json());

  const { data, isMutating, trigger } = useSWRMutation("/api/artists", fetcher);

  useEffect(() => {
    if (session.status === "authenticated") {
      trigger({ artist: "Metallica" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('appName')}
          </Typography>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List>
              <ListItem>
                <Link href="/">{t('menu.home')}</Link>
              </ListItem>
              <ListItem>
                <Link href="/">{t('home')}</Link>
              </ListItem>
              <ListItem>
                <Link href="/">{t('home')}</Link>
              </ListItem>
              <ListItem>
                <Link href="https://open.spotify.com/?">{t('menu.spotifyApp')}</Link>
              </ListItem>
            </List>
          </Drawer>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {session.status === "authenticated" && <IconButton edge="end" onClick={() => signOut()}>
            <AccountCircle />
          </IconButton>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopMenuBar;
