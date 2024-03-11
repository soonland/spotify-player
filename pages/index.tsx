import Head from 'next/head';
import styles from '../app/page.module.css';
import React, { useEffect } from 'react';
import {
  signIn,
  signOut,
  useSession
} from 'next-auth/react';
import { Button, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {session.status === "unauthenticated" && <>
          <Typography>You are not signed in</Typography>
          <Button variant="text" onClick={() => signIn()}>Sign in</Button>
        </>}

        {session.status === "authenticated" && <>
         <Image src={session.data.user?.image as string} alt='profile' width={64} height={64}/> 
          <h1>Signed in as {session.data.user?.name} </h1>
          {isMutating && (
            <CircularProgress />
          )}
          {data?.artists && data?.artists?.items?.map((el, index) => (
            <Typography key={index}>
              <Image src={el.images[2]?.url as string} alt='' width={160} height={160}/> 
              <a href={el.external_urls.spotify}>{el.name}</a>
            </Typography>
          ))}
          <Button onClick={() => signOut()}>Sign out</Button>
        </>}

      </main>
    </div>
  )
}

export default Home;
