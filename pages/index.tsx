import { useSession } from "next-auth/react";
import { Box, Grid, styled } from "@mui/material";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { ParsedUrlQuery } from "querystring";
import { ISearch } from "@/models/types";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
}));

const StyledGridOverlay = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

const CustomNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <SentimentVeryDissatisfiedIcon />
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
};

const Home = () => {
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");

  const fetcher = async (url: string, { arg }: { arg: { searchType: string; searchString: string } }) => {
    if (arg.searchType === undefined) {
      arg.searchType = "album,artist,track";
    }

    const parameterizedQuery = new URLSearchParams({
      q: arg.searchString,
      type: arg.searchType,
    }).toString();
    const res = await fetch(`${url}?${parameterizedQuery}`);
    return await res.json();
  };

  const { data, isMutating, trigger } = useSWRMutation("/api/search", fetcher);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: t("dataGrid.search.type"),
      width: 100,
      headerAlign: "center",
      align: "center",
      valueGetter: (value) => {
        return t(`dataGrid.rows.type.${value}`);
      },
    },
    {
      field: "artistName",
      headerName: t("dataGrid.search.artistName"),
      width: 150,
      headerAlign: "center",
    },
    {
      field: "albumCover",
      headerName: t("dataGrid.search.albumCover"),
      width: 90,
      headerAlign: "center",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Image src={params.value as string} alt="" width={80} height={80} />
      ),
    },
    {
      field: "spotifyLink",
      headerName: t("dataGrid.search.spotifyLink"),
      headerAlign: "center",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={params.value as string} target="_blank" rel="noopener noreferrer">
          Click Me
        </a>
      ),
    },
  ];

  const handleSearch = (searchQuery: ParsedUrlQuery) => {
    const searchString = searchQuery.q as string;
    const searchType = searchQuery.type as string;
    trigger({ searchType, searchString });
  };

  useEffect(() => {
    if (router.query.q) {
      handleSearch(router.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q, router.query.type]);

  const convertResultsToDataGridRows = (data: ISearch) => {
    const rows =
      data?.artists?.items?.map((artist) => ({
        type: artist.type,
        id: artist.id,
        artistName: artist.name,
        albumCover: artist.images?.[0]?.url,
        spotifyLink: artist.external_urls.spotify,
      })) || [];

    const rows2 =
      data?.albums?.items?.map((album) => ({
        type: album.type,
        id: album.id,
        artistName: album.name,
        albumCover: album.images[0].url,
        spotifyLink: album.external_urls.spotify,
      })) || [];

    const rows3 =
      data?.tracks?.items?.map((track) => ({
        type: track.type,
        id: track.id,
        artistName: track.name,
        albumCover: track.album.images[0].url,
        spotifyLink: track.external_urls.spotify,
      })) || [];
    // concat all rows
    console.log("rows", rows);
    console.log("rows2", rows2);
    console.log("rows3", rows3);
    console.log("data", data);
    return rows.concat(rows2).concat(rows3);
  };

  return (
    <div>
      <main>
        <Box>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && (
              <Grid item>
                <StyledDataGrid
                  autoHeight
                  rowHeight={80}
                  checkboxSelection
                  pageSizeOptions={[5, 10, 25, 50, 100]}
                  pagination
                  loading={isMutating}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  columns={columns}
                  rows={convertResultsToDataGridRows(data)} // Ensure data is not undefined
                  slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                  sx={{ "--DataGrid-overlayHeight": "100px" }}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Home;
