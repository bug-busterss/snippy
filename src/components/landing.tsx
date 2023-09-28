import CardComponent from "@/components/card-comp";
import { Button } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Imagestyler from "./imagestyler";
import CardComponentSnip from "./card-component";

export default function Landing() {
  const [active, setActive] = useState(0);
  return (
    <div className="bg-gradient-to-br from-primary-100 to-primary-300">
      <div className="flex  flex-col items-center justify-center gap-[60px] px-[80px] py-[120px]">
        <div className="flex flex-col items-center gap-4 ">
          <h1 className="text-6xl font-extrabold leading-10 ">SNIPPY</h1>
          <p className="text-xl text-slate-200">
            Share your code with the world in seconds
          </p>
        </div>

        <div className="max-w-4xl text-center text-xl font-normal ">
          Snippy is a simple and fast web app that lets you create, edit, and
          share code snippets with anyone. Just copy and paste your code, choose
          a language and a name, and click on Create. You&apos;ll get a unique
          URL or you can choose one yourself that you can share with anyone. You
          can also view and comment on other people&apos;s code snippets
        </div>
        <div>
          <Button
            as={Link}
            href="/snips/new"
            className="flex h-14 items-center justify-center rounded-full  px-3 py-6 text-lg font-medium shadow-lg"
            color="primary"
          >
            <span className="pl-1">Get Started</span>
            <ChevronRight size={25} />
          </Button>
        </div>
        <div className="grid grid-flow-col gap-4 ">
          <CardComponent
            title="Paste code"
            description="Once you've got all of your code into CodeImage, you can customize your snippet."
            clickHandler={() => setActive(0)}
            isBorder={active == 0}
          />
          <CardComponent
            title="Choose a language"
            description="Once you've got all of your code into CodeImage, you can customize your snippet."
            clickHandler={() => setActive(1)}
            isBorder={active == 1}
          />
          <CardComponent
            title="Create a snippet"
            description="Now you have created a snippet and you can share it to whoever yout want"
            clickHandler={() => setActive(2)}
            isBorder={active == 2}
          />
        </div>

        <Imagestyler i={active} />
      </div>
      <div className="flex p-8">
        <CardComponentSnip />
        <CardComponentSnip />
        <CardComponentSnip />
      </div>
    </div>
  );
}
