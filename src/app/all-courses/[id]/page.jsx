"use client";
import Image from "next/image";
import React from "react";
import { MdDateRange } from "react-icons/md";

const page = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/courses/${params.id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen py-10">
        <h2>Course not found</h2>
      </div>
    );
  }

  const data = await res.json();
  console.log(data);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-2">
        {/* header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center md:w-10/12 mx-auto">
          {data.title}
        </h2>

        <div className="my-4 mt-6 flex justify-between flex-col md:flex-row">
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
              <span className="flex text-gray-600 text-lg font-medium">
                <MdDateRange className="mt-1" />
                12.05.18
              </span>{" "}
            </div>
          </div>

          <div className="flex flex-col text-gray-600 text-xl font-medium">
            <span>Duration : 45.15 h</span>
            <span>
              <span>Price : </span>
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
