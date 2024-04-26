import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../app/theme";
import TopMenuBar from "@/components/TopMenuBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import MyProfile from "@/components/MyProfile";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Spotify App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        <TopMenuBar />
        <Box padding={4} mb={6}>
          {pageProps.showProfile && <MyProfile />}
          {/* <MyProfile /> */}
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default App;
