import { useSession } from "next-auth/react";
import { Box, CircularProgress, Grid, styled } from "@mui/material";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
}));
const Home = () => {
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("common");

  const fetcher = (url: string, { arg }: { arg: { artist: string } }) =>
    fetch(`${url}/${arg.artist}`).then((res) => res.json());

  const { data, isMutating, trigger } = useSWRMutation("/api/artists", fetcher);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
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

  const handleSearch = (searchString: string) => {
    trigger({ artist: searchString });
  };

  useEffect(() => {
    if (router.query.q) {
      handleSearch(router.query.q as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q]);

  return (
    <div>
      <main>
        <Box padding={2}>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && (
              <>
                <Grid item>
                  {isMutating && <CircularProgress />}
                  {!isMutating && (
                    <StyledDataGrid
                      rowHeight={80}
                      pageSizeOptions={[5, 10, 25]}
                      pagination
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      columns={columns}
                      rows={
                        data?.artists?.items?.map((el, index) => ({
                          id: index,
                          artistName: el.name,
                          albumCover: el.images[2]?.url,
                          spotifyLink: el.external_urls.spotify,
                        })) || []
                      }
                    />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Home;
