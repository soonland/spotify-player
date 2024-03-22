import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../app/theme";
import TopMenuBar from "@/components/TopMenuBar";
import Head from "next/head";
import MyProfile from "@/components/MyProfile";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Spotify App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        <TopMenuBar />
        <Box padding={2}>
          <MyProfile />
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
