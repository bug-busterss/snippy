import React from "react";

const CardComponentSnip = () => {
  return (
    <div className="flex h-28 w-2/5 items-center  rounded-br-[4rem] rounded-tl-[4rem] bg-white">
      <div className="flex h-full w-9/12 flex-col items-center justify-center rounded-br-[3.5rem] rounded-tl-[4rem] bg-background text-foreground">
        <p>tittle</p>
      </div>
      <div className="flex flex-col items-center justify-center pl-2 text-center text-xs text-black">
        <span>Language</span>
        <span>Time Ago</span>
      </div>
    </div>
  );
};

export default CardComponentSnip;
