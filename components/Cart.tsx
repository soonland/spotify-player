import { ICart } from "@/models/types";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, styled } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { FC, useEffect, useState } from "react";
import { PlayCircle as PlayCircleIcon, ExpandMore as ExpandMoreIcon, Clear as ClearIcon } from "@mui/icons-material";

const StyledTable = styled("table")(() => ({
  borderCollapse: "collapse",
  width: "100%",
}));

const Cart: FC<ICart> = ({ cart, removeFromCart }) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (cart?.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [cart]);

  return (
    <Box sx={{ mb: 3 }}>
      <Accordion disableGutters elevation={2} expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>{t("cart.cart", { count: cart?.length })}</AccordionSummary>
        <AccordionDetails>
          <StyledTable border={1} className="tableCss">
            <thead>
              <tr>
                <th>{t("cart.artistName")}</th>
                <th>{t("cart.albumName")}</th>
                <th>{t("cart.trackName")}</th>
                <th>{t("cart.listen")}</th>
                <th>{t("cart.remove")}</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((track) => {
                // display in a table
                return (
                  <tr key={track.id}>
                    <td>{track.artistName}</td>
                    <td>{track.albumName}</td>
                    <td>{track.trackName}</td>
                    <td align="center">
                      <IconButton>
                        <PlayCircleIcon />
                      </IconButton>
                      {/* <a href={track.spotifyLink} target="_blank" rel="noreferrer"> */}
                    </td>
                    <td align="center">
                      <IconButton onClick={() => removeFromCart(track.id)}>
                        <ClearIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Cart;
