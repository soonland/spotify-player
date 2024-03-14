import Head from 'next/head';
import {
  signIn,
  useSession
} from 'next-auth/react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
import TopMenuBar from '@/components/TopMenuBar';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const Home = () => {
  const session = useSession();

  const fetcher = (url: string, { arg }: { arg: { artist: string } }) => fetch(`${url}/${arg.artist}`).then(res => res.json());

  const { data, isMutating, trigger } = useSWRMutation("/api/artists", fetcher);

  const columns: GridColDef[] = [
    {
      field: 'artistName',
      headerName: 'artistName',
      width: 150,
    },
    {
      field: 'albumCover',
      headerName: 'albumCover',
      width: 160,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Image src={params.value as string} alt='' width={160} height={160} />
      ),
    },
    {
      field: 'spotifyLink',
      headerName: 'spotifyLink',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <a href={params.value as string} target="_blank" rel="noopener noreferrer">Click Me</a>
      ),
    }
  ]

  const handleSearch = (searchString: string) => {
    trigger({ artist: searchString });
  };

  return (
    <div>
      <Head>
        <title>Spotify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TopMenuBar onSearch={handleSearch} />
        {session.status === "unauthenticated" && <>
          <Typography>You are not signed in</Typography>
          <Button variant="text" onClick={() => signIn()}>Sign in</Button>
        </>}

        <Box padding={2}>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && <>
              <Grid item container flexDirection={"row"} alignItems={"center"}>
                <Image src={session.data.user?.image as string} alt='profile' width={64} height={64} />
                <div>Signed in as {session.data.user?.name}</div>
              </Grid>
              <Grid item>
                {isMutating && (
                  <CircularProgress />
                )}
                {!isMutating && <DataGrid
                  rowHeight={160}
                  columns={columns}
                  rows={data?.artists?.items?.map((el, index) =>
                  ({
                    id: index,
                    artistName: el.name,
                    albumCover: el.images[2]?.url,
                    spotifyLink: el.external_urls.spotify,
                  })) || []} />}
              </Grid>
            </>}
          </Grid>
        </Box>
      </main>
    </div>
  )
}

export default Home;
