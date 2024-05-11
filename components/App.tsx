import { Box, CssBaseline } from "@mui/material";
import TopMenuBar from "@/components/TopMenuBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import MyProfile from "@/components/MyProfile";
import { QueueProvider } from "@/components/context/QueueProvider";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Spotify App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <TopMenuBar />
      <Box padding={4} mb={6} mt={6}>
        {pageProps.showProfile && <MyProfile />}
        <QueueProvider>
          <Component {...pageProps} />
        </QueueProvider>
      </Box>
      <Footer />
    </>
  );
};

export default App;
