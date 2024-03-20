import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer, InputBase, List, ListItem, alpha, styled } from "@mui/material";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { signOut, useSession } from "next-auth/react";
import { AccountCircle } from "@mui/icons-material";
import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const TopMenuBar: FC = (): ReactElement => {
  const session = useSession();
  const router = useRouter();

  const { t } = useTranslation("common");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [search, setSearch] = useState<string>("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("appName")}
          </Typography>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
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
                <Link href="https://open.spotify.com/?">{t("menu.spotifyApp")}</Link>
              </ListItem>
            </List>
          </Drawer>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              value={search}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/?q=${search}`);
                }
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
          {session.status === "authenticated" && (
            <IconButton edge="end" onClick={() => signOut()}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopMenuBar;
