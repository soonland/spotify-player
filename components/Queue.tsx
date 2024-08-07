import { IQueue } from "@/models/types";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, styled } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { FC, useContext, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QueueContext } from "./context/QueueProvider";

const StyledTable = styled("table")(() => ({
  borderCollapse: "collapse",
  width: "100%",
}));

const Queue: FC<IQueue> = () => {
  const { queue, removeFromQueue } = useContext(QueueContext);
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (queue?.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [queue]);

  return (
    <Box sx={{ mb: 3 }}>
      <Accordion disableGutters elevation={2} expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("queue.queue", { count: queue?.length })}
        </AccordionSummary>
        <AccordionDetails>
          <StyledTable border={1}>
            <thead>
              <tr>
                <th>{t("queue.artistName")}</th>
                <th>{t("queue.albumName")}</th>
                <th>{t("queue.trackName")}</th>
                <th>{t("queue.remove")}</th>
              </tr>
            </thead>
            <tbody>
              {queue?.map((track) => {
                // display in a table
                return (
                  <tr key={track.id}>
                    <td>{track.artistName}</td>
                    <td>{track.albumName}</td>
                    <td>{track.trackName}</td>
                    <td align="center">
                      <IconButton onClick={() => removeFromQueue(track.id)}>
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

export default Queue;
