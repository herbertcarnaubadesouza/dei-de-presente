// _app.tsx
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as loaderAnimation from "../../public/azul.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

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
          {/*@ts-ignore*/}
          <Lottie options={defaultOptions} height={300} width={300} />
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
