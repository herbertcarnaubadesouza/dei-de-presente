// _app.tsx
import { defaultOptionsGift } from "@/animation";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
  };

  const complete = () => {
    const delay = Math.floor(Math.random() * 2001);
    setTimeout(() => {
      setLoading(false);
    }, delay);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", complete);
    Router.events.on("routeChangeError", complete);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", complete);
      Router.events.off("routeChangeError", complete);
    };
  }, []);

  return (
    <>
      {loading && (
        <div id="globalLoader">
          <div className="lottie-container">
            {/*@ts-ignore*/}
            <Lottie options={defaultOptionsGift} height={300} width={300} />
          </div>
        </div>
      )}
      <>
        <SessionProvider session={session}>
          {/*@ts-ignore*/}
          <Component {...pageProps} />
          <ToastContainer />
        </SessionProvider>
      </>
    </>
  );
}
