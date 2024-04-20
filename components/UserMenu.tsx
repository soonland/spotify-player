import { AccountCircle, Logout, ManageAccounts } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, MouseEvent } from "react";
import { signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";

const UserMenu = () => {
  const { t, lang } = useTranslation("common");
  const session = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMySpotifyAccount = () => {
    let urlLang = "ca-fr";
    if (lang === "en") urlLang = "ca-en";
    window.open(`https://www.spotify.com/${urlLang}/account/overview/`, "_blank", "noopener, noreferrer");
  };

  const openMySpotifyProfile = () => {
    const userProfile = session.data?.user?.id;
    window.open(`https://open.spotify.com/user/${userProfile}`, "_blank", "noopener, noreferrer");
  };

  return (
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
        <MenuItem onClick={openMySpotifyAccount} data-testid="testid.mySpotifyAccount">
          {t("common.mySpotifyAccount")}
          <ManageAccounts fontSize="small" sx={{ mr: 1 }} />
        </MenuItem>
        <MenuItem onClick={openMySpotifyProfile} data-testid="testid.mySpotifyProfile">
          {t("common.mySpotifyProfile")}
          <AccountCircle fontSize="small" sx={{ mr: 1 }} />
        </MenuItem>
        <LanguageSwitcher />
        <MenuItem onClick={() => signOut()} data-testid="testid.logout">
          {t("common.signOut")}
          <Logout fontSize="small" sx={{ mr: 1 }} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
