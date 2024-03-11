import Head from 'next/head';
import styles from '../app/page.module.css';
import React from 'react';
import {
  signIn,
  signOut,
  useSession
} from 'next-auth/react';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';

const Home = () => {
  const session = useSession();

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
          <p>Signed in as {JSON.stringify(session)} </p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>}

      </main>
    </div>
  )
}

export default Home;
