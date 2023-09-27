import Layout from "@/components/layout";
import React, { type ReactElement } from "react";

export default function landing() {
  return (
    <main className="h-full bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex  flex-col items-center justify-center gap-[60px] px-[80px] py-[120px]">
        <div className="flex flex-col items-center gap-4 ">
          <h1 className="text-6xl font-extrabold leading-10 ">SNIPPY</h1>
          <p className="text-xl text-slate-200">
            Share your code with the world in seconds
          </p>
        </div>
        <div className="max-w-xl text-center text-xl font-normal ">
          Snippy is a simple and fast web app that lets you create, edit, and
          share code snippets with anyone. Just copy and paste your code, choose
          a language and a name, and click on Create. You’ll get a unique URL or
          you can choose one yourself that you can share with anyone. You can
          also view and comment on other people’s code snippets
        </div>
      </div>
    </main>
  );
}
landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
