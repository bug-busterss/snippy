import { AppProps, type AppType } from "next/app";

import { api } from "@/utils/api";
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <main className="bg-background text-foreground dark">
          {getLayout(<Component {...pageProps} />)}
        </main>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
