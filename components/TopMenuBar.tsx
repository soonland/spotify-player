import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { signOut, useSession } from "next-auth/react";
import { AccountCircle, Logout } from "@mui/icons-material";
import { FC, ReactElement, MouseEvent, useState } from "react";
import Search from "./Search";
import LanguageSwitcher from "./LanguageSwitcher";

const TopMenuBar: FC = (): ReactElement => {
  const session = useSession();

  const { t } = useTranslation("common");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" data-testid="testid.appBar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
            data-testid="testid.menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("appName")}
          </Typography>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} data-testid="testid.drawer">
            <List>
              <ListItem>
                <Link href="/">{t("menu.home")}</Link>
              </ListItem>
              <ListItem>
                <Link href="/top5">{t("menu.top5")}</Link>
              </ListItem>
              <ListItem>
                <Link href="/my-playlists">{t("menu.myPlaylists")}</Link>
              </ListItem>
              <ListItem>
                <Link href="/changelog">{t("menu.changelog")}</Link>
              </ListItem>
              <ListItem>
                <Link href="https://open.spotify.com/?">{t("menu.spotifyApp")}</Link>
              </ListItem>
            </List>
          </Drawer>
          <Search />
          {session.status === "authenticated" && (
            <>
              <IconButton edge="end" onClick={handleClick} data-testid="testid.accountButton" sx={{ ml: 1 }}>
                <AccountCircle htmlColor="white" />
              </IconButton>
              <Menu
                id="user-menu"
                data-testid="testid.userMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "user-menu",
                }}
                sx={{
                  "& .MuiMenuItem-root": { justifyContent: "space-between" },
                  "& .MuiSvgIcon-root": { marginLeft: 1 },
                }}
              >
                <LanguageSwitcher />
                <MenuItem onClick={() => signOut()} data-testid="testid.logout">
                  {t("common.signOut")}
                  <Logout fontSize="small" sx={{ mr: 1 }} />
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopMenuBar;
