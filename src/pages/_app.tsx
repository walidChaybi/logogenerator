import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { NextUIProvider } from "@nextui-org/react";
import Header2 from "~/components/Header2";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Head>
          <title>Icon Wizard</title>
          <meta
            name="google-adsense-account"
            content="ca-pub-1378947158483618"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/* <Header /> */}
        <Header2 />
        <Component {...pageProps} />
        <Footer />
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
