import { type PropsWithChildren } from "react";
import SnipNav from "./navbar";
import { ThemeSwitcher } from "./theme-switcher";
import { ReactElement } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen">
      <SnipNav />
      <ThemeSwitcher />
      {children}
    </div>
  );
}
