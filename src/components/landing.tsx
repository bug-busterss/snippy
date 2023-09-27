import CardComponent from "@/components/card-comp";
import { Button } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Landing() {
  const [active, setActive] = useState(0);
  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
            color="primary"
            className="flex h-14 items-center justify-center gap-1 rounded-full px-3 py-6 text-lg font-medium"
            href="/snips/new"
          >
            <span>Get Started</span>
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
      </div>
    </div>
  );
}