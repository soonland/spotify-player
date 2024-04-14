import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import { FC, ReactElement } from "react";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  marginTop: "calc(10% + 120px)",
  position: "fixed",
  bottom: 0,
  width: "100%",
}));

const TopMenuBar: FC = (): ReactElement => {
  const versionNumber = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "local";
  return (
    <StyledFooter sx={{ flexGrow: 1 }} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
      {versionNumber} © {new Date().getFullYear()}
    </StyledFooter>
  );
};

export default TopMenuBar;