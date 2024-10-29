"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import Loading from "../loading";

const LiveClasses = () => {
  const { data: liveClasses, isLoading } = useQuery({
    queryKey: ["live-class"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/live_classes`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 mb-8 mt-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-secondary">
        Live Classes
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {liveClasses?.map((liveClass, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-6 bg-card rounded-lg shadow p-4 duration-300 hover:shadow-md hover:scale-[1.01] transition-transform h-full border"
          >
            {/* Image on the Left */}
            <div className="w-full lg:w-1/3 h-40 lg:h-auto">
              <Image
                src={
                  liveClass.thumbnail?.startsWith("http") ||
                  liveClass.thumbnail?.startsWith("/")
                    ? liveClass.thumbnail
                    : ""
                }
                alt="Course Thumbnail"
                width={256}
                height={144}
                className="w-full rounded-lg h-full object-cover"
              />
            </div>

            {/* Information on the Right */}
            <div className="flex flex-col justify-between w-full lg:w-2/3">
              <div>
                <h3 className="text-secondary text-lg font-semibold mb-2 mt-2 md:mt-0">
                  {liveClass.courseName}
                </h3>
                <p className="text-sm mb-0.5">
                  Category:{" "}
                  <span className="font-semibold">{liveClass.category}</span>
                </p>
                <p className="text-sm mb-0.5">
                  Author:{" "}
                  <span className="font-semibold">{liveClass.authorName}</span>
                </p>
                <p className="text-sm mb-0.5 ">
                  Live Time:{" "}
                  <span className="font-semibold">{liveClass.liveTime}</span>
                </p>
              </div>

              {/* Button aligned right */}
              <div className="flex justify-end mt-4">
                <Link href={liveClass.liveLink} target="_blank">
                  <button className="bg-secondary text-white rounded-md px-3 py-2 m-2 hover:opacity-80 transition uppercase">
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
