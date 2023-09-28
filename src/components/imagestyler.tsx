import Image from "next/image";
import React from "react";
const images: string[] = ["/language.png", "/paste-code.png", "/snip.png"];

export default function Imagestyler({ i }: { i: number }) {
  console.log(images[i]);
  return (
    <div className="p-4">
      <Image
        src={images[i]}
        alt="alt"
        width={720}
        height={800}
        quality={100}
        className="h-[500px] w-auto rounded-lg"
      />
    </div>
  );
}
