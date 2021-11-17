import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/Header/Header";
import { AppWrapperProvider } from "../lib/state";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapperProvider>
      <Header />
      <Component {...pageProps} />
    </AppWrapperProvider>
  );
}

export default MyApp;
