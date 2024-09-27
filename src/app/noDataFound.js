import Image from "next/image";
import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image
        src={"/assets/noData.png"}
        className=" w-96"
        alt="nodata"
        width={1000}
        height={1000}
      />
      <h1 className="text-4xl font-bold text-center">Data Not Found</h1>
      <p className=" text-gray-500 mb-2">
        Opps! someting went wrong please try again
      </p>
    </div>
  );
};

export default NoDataFound;
