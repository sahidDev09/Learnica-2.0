import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Image src={"/assets/loader.gif"} alt="" width={100} height={100} />
    </div>
  );
}

export default Loading;
