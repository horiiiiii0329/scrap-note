import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header/Header";
import { AppWrapperProvider } from "../lib/state";
import { MobileHeader } from "../components/Header/MobileHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapperProvider>
      <Header />
      <MobileHeader />
      <Component {...pageProps} />
    </AppWrapperProvider>
  );
}

export default MyApp;
