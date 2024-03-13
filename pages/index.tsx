import Head from 'next/head';
import '../app/globals.css';
import React, { useEffect } from 'react';
import {
  signIn,
  useSession
} from 'next-auth/react';
import { Button, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
import TopMenuBar from '@/components/TopMenuBar';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const Home = () => {
  const session = useSession();

  const fetcher = (url: string, { arg }: { arg: { artist: string } }) => fetch(`${url}/${arg.artist}`).then(res => res.json());

  const { data, isMutating, trigger } = useSWRMutation("/api/artists", fetcher);

  useEffect(() => {
    if (session.status === "authenticated") {
      trigger({ artist: "Metallica" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

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

  return (
    <div>
      <Head>
        <title>Spotify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TopMenuBar />
        {session.status === "unauthenticated" && <>
          <Typography>You are not signed in</Typography>
          <Button variant="text" onClick={() => signIn()}>Sign in</Button>
        </>}

        {session.status === "authenticated" && <>
          <Image src={session.data.user?.image as string} alt='profile' width={64} height={64} />
          <h1>Signed in as {session.data.user?.name}</h1>
          {isMutating && (
            <CircularProgress />
          )}
          {!isMutating && <DataGrid rowHeight={160} columns={columns} rows={data?.artists?.items?.map((el, index) =>
          ({
            id: index,
            artistName: el.name,
            albumCover: el.images[2]?.url,
            spotifyLink: el.external_urls.spotify,
          })) || []} />}
          {/* {!isMutating && data?.artists && data?.artists?.items?.map((el, index) => (
            <Typography key={index}>
              <Image src={el.images[2]?.url as string} alt='' width={160} height={160}/> 
              <a href={el.external_urls.spotify}>{el.name}</a>
            </Typography>
          ))} */}
        </>}

      </main>
    </div>
  )
}

export default Home;
