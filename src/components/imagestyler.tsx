import Image from "next/image";
import React from "react";
const images: string[] = ["/language.png", "/paste-code.png", "/code.png"];

export default function Imagestyler({ i }: { i: number }) {
  console.log(images[i]);
  return (
    <div className="p-4">
      <img
        src={images[i]}
        alt="alt"
        className=" h-auto w-[1200px] rounded-lg border border-white"
      />
    </div>
  );
}
