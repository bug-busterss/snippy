import { type PropsWithChildren } from "react";
import SnipNav from "./navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen overflow-x-hidden scrollbar-hide">
      <SnipNav />
      {children}
    </div>
  );
}
