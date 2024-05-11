import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/context/ThemeProvider";
import App from "@/components/App";

function _App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
      <ThemeProvider>
        <App pageProps={pageProps} Component={Component} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default _App;
