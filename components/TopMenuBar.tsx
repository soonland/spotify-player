import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, useTheme } from "@mui/material";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useSession } from "next-auth/react";
import { FC, ReactElement, useState } from "react";
import Search from "./Search";
import UserMenu from "./UserMenu";
import ChangeThemeMode from "./ChangeThemeMode";

const TopMenuBar: FC = (): ReactElement => {
  const session = useSession();

  const { t } = useTranslation("common");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" data-testid="testid.appBar">
        <Toolbar sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary }}>
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
            </List>
          </Drawer>
          <Search />
          {session.status === "authenticated" && <UserMenu />}
          <ChangeThemeMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopMenuBar;
