import { type ReactElement } from "react";
import Landing from "../components/landing";
import Layout from "@/components/layout";

export default function Home() {
  return <Landing />;
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
