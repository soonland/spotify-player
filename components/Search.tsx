import { Button, InputBase, Menu, MenuItem, Stack, alpha, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useState, MouseEvent, PropsWithChildren } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useTranslation from "next-translate/useTranslation";

interface Props {
  // Ajoutez les propriétés (props) nécessaires ici
}

const StyledStack = styled(Stack)(({ theme }) => ({
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

const StyledSearch: FC<PropsWithChildren> = ({ children }) => {
  return <StyledStack direction={"row"}>{children}</StyledStack>;
};

interface SearchTypeSelectProps {
  onSelect: (searchType: string) => void;
}

const SearchTypeSelect: FC<SearchTypeSelectProps> = ({ onSelect }) => {
  const { t } = useTranslation("common");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (searchType: string) => {
    setAnchorEl(null);
    onSelect(searchType);
  };

  return (
    <>
      <Button
        id="basic-button"
        data-testid="testid.searchType"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SearchIconWrapper>
          <SearchIcon htmlColor="white" />
        </SearchIconWrapper>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem data-testid="testid.search.searchArtist" onClick={() => handleClose("artist")}>
          {t("search.searchArtist")}
        </MenuItem>
        <MenuItem data-testid="testid.search.searchAlbum" onClick={() => handleClose("album")}>
          {t("search.searchAlbum")}
        </MenuItem>
        <MenuItem data-testid="testid.search.searchTrack" onClick={() => handleClose("track")}>
          {t("search.searchTrack")}
        </MenuItem>
      </Menu>
    </>
  );
};

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
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search: FC<Props> = () => {
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const router = useRouter();

  return (
    <StyledSearch>
      <SearchTypeSelect onSelect={setSearchType} />
      <StyledInputBase
        placeholder="Search..."
        value={search}
        data-testid="testid.search"
        inputProps={{ "aria-label": "search" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (!search) {
              return;
            }
            const searchParams = new URLSearchParams();
            searchParams.set("q", search);
            if (searchType) searchParams.set("type", searchType);
            router.push(`/?${searchParams.toString()}`);
          }
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </StyledSearch>
  );
};

export default Search;
