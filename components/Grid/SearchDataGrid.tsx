import useTranslation from "next-translate/useTranslation";
import EnhancedDataGrid from "./EnhancedDataGrid";
import { Box, IconButton, Link, styled } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useContext, useState } from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import { GridAlignment, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { QueueContext } from "../context/QueueContext";

const StyledGridOverlay = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

const CustomNoRowsOverlay = () => {
  const { t } = useTranslation("common");
  return (
    <StyledGridOverlay>
      <SentimentVeryDissatisfiedIcon fontSize="large" />
      <Box sx={{ mt: 1 }}>{t("common.noDataFound")}</Box>
    </StyledGridOverlay>
  );
};

const SearchDataGrid = ({ isMutating, data }) => {
  const { t } = useTranslation("common");
  const { addToQueue } = useContext(QueueContext);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const createColumn = (
    field: string,
    headerName: string,
    width: number,
    align: GridAlignment | undefined = "center",
  ): GridColDef => {
    return {
      field,
      headerName: t(`dataGrid.search.${field}`),
      width,
      headerAlign: align,
      align,
    };
  };

  const columns = [
    createColumn("type", "type", 100),
    createColumn("artistName", "artistName", 150),
    createColumn("albumName", "albumName", 150),
    createColumn("trackName", "trackName", 150),
    {
      ...createColumn("imgCover", "imgCover", 150),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Image src={params.value as string} alt="" width={80} height={80} />
      ),
    },
    {
      ...createColumn("spotifyLink", "spotifyLink", 150),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={params.value as string} target="_blank" rel="noopener noreferrer">
          Click Me
        </a>
      ),
    },
    {
      ...createColumn("recommandationLink", "recommandationLink", 150),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => {
        return <Link href={`/recommendations/${params.row.type}/${params.row.id}`}>Click Me</Link>;
      },
    },
    {
      ...createColumn("addToPlaylist", "addToPlaylist", 150),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <IconButton onClick={() => addToQueue(params.row)}>
          <AddIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <EnhancedDataGrid
      autoHeight
      rowHeight={80}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      pagination
      loading={isMutating}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      columns={columns}
      rows={data} // Ensure data is not undefined
      slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      sx={{ "--DataGrid-overlayHeight": "100px" }}
    />
  );
};

export default SearchDataGrid;
