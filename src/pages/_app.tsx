import { type AppProps } from "next/app";

import { api } from "@/utils/api";
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useState, type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ initialSession: Session }> & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="bg-background text-foreground dark">
            {getLayout(<Component {...pageProps} />)}
          </main>
        </ThemeProvider>
      </NextUIProvider>
    </SessionContextProvider>
  );
}

export default api.withTRPC(MyApp);
