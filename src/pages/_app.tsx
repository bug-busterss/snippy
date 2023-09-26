import { type AppType } from "next/app";

import { api } from "@/utils/api";
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <main className="text-foreground bg-background dark">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
