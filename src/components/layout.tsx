import SnipNav from "./navbar";
import { ThemeSwitcher } from "./theme-switcher";

export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen">
      <SnipNav />
      <ThemeSwitcher />
      <main>{children}</main>
    </div>
  );
}
