import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { Box, Button, CircularProgress, Grid, Typography, styled } from "@mui/material";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import TopMenuBar from "@/components/TopMenuBar";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
}));
const Home = () => {
  const session = useSession();
  const { t } = useTranslation("common");

  const fetcher = (url: string, { arg }: { arg: { artist: string } }) =>
    fetch(`${url}/${arg.artist}`).then((res) => res.json());
  const fetcherTop5 = (url: string) => fetch(url).then((res) => res.json());

  const { data, isMutating, trigger } = useSWRMutation("/api/artists", fetcher);
  const { data: dataTop5, isMutating: isMutatingTop5, trigger: triggerTop5 } = useSWRMutation("/api/me", fetcherTop5);
  const {
    data: dataPlaylist,
    isMutating: isMutatingPlaylist,
    trigger: triggerPlaylist,
  } = useSWRMutation("/api/me/playlists", fetcherTop5);

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
    if (session.status === "authenticated") {
      triggerTop5();
      triggerPlaylist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <div>
      <Head>
        <title>Spotify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TopMenuBar onSearch={handleSearch} />
        {session.status === "unauthenticated" && (
          <>
            <Typography>You are not signed in</Typography>
            <Button variant="text" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}

        <Box padding={2}>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && (
              <>
                <Grid item container flexDirection={"row"} alignItems={"center"}>
                  <Image src={session.data.user?.image as string} alt="profile" width={64} height={64} />
                  <div>Signed in as {session.data.user?.name}</div>
                </Grid>
                <Grid item>
                  <ul>
                    {!isMutatingTop5 &&
                      dataTop5?.items.map((el, index) => (
                        <li key={index}>
                          {el.name} par {el.artists[0].name}
                        </li>
                      ))}
                  </ul>
                </Grid>
                <Grid item>
                  <ul>
                    {!isMutatingPlaylist &&
                      dataPlaylist?.items.map((el, index) => (
                        <li key={index}>
                          <a href={el.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {el.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </Grid>
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
