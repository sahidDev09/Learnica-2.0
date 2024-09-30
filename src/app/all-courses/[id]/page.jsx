import Image from "next/image";
import React from "react";
import { MdDateRange } from "react-icons/md";

const page = ({ params }) => {
  console.log(params.id);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-2">
        {/* header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center md:w-10/12 mx-auto my-4">
          Capturing Moments: A Guide to Landscape Photography
        </h2>

        <div className="my-4 flex justify-between flex-col md:flex-row">
          <div className="flex gap-2">
            <Image
              alt="owner"
              width={100}
              height={100}
              src={"/assets/developers/numan.jpg"}
              className="w-16 h-16 border rounded-full"
            ></Image>
            <div className="flex gap-1 text-gray-600">
              <div className="flex flex-col">
                <span className="font-medium text-xl">Owner name</span>
                <span className="font-normal text-md">Owner title</span>
              </div>
              |
              <span className="text-gray-600 text-xl font-medium">
                category
              </span>
              |
              <span className="flex">
                <MdDateRange className="mt-1" />
                12.05.18
              </span>{" "}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 text-xl font-medium">
              Duration : <span className="text-gray-800">45.15</span> h
            </span>
            <span className="flex text-lg font-medium">
              <span className="text-gray-600">Price : </span>
              <span className="text-red-500"> 60</span> $
            </span>
          </div>
        </div>
        {/* body */}

        <div className="">
          <p className="py-4 md:py-8 text-lg text-gray-500">
            Exquisite floral watercolor painting adding natural elegance to any
            space.Exquisite floral watercolor painting adding natural elegance
            to any space.Exquisite floral watercolor painting adding natural
            elegance to any space.Exquisite floral watercolor painting adding
            natural elegance to any space.Exquisite floral watercolor painting
            adding natural elegance to any space. space.Exquisite floral
            watercolor painting adding natural elegance to any space.Exquisite
            floral watercolor painting adding natural elegance to any
            space.Exquisite floral watercolor painting adding natural elegance
            to any space.Exquisite floral watercolor painting adding natural
            elegance to any space.
          </p>
        </div>
        {/* rating */}
        {/* comment/preview */}
      </div>
    </div>
  );
};

export default page;
