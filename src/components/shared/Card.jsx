"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Loading from "@/app/loading";

const Card = ({ course }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <div className=" bg-card">
      <div className="w-full mx-auto md:mx-0 border rounded-xl text-gray-800 dark:bg-gray-800 dark:text-white shadow-md">
        <Image
          className="w-full h-[260px] rounded-xl object-fit"
          src={course?.additionalInfo?.image}
          alt={course?.name}
          width={1000}
          height={1000}
        />

        <div className="p-4">
          <p className="text-white md:text-base text-sm bg-primary rounded-full px-2 py-0.5 w-fit">
            {course.category}
          </p>
          <h3 className="text-lg font-semibold mb-1 mt-2">
            {course.name.length > 35
              ? `${course.name.slice(0, 35)}...`
              : course.name}
          </h3>
          <p className="text-gray-500 text-sm">
            {" "}
            Published:{" "}
            <span className="font-semibold">
              {formatDate(course.publish_date)}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Author: <span className="font-semibold">{course.author.name}</span>
          </p>

          <Link href={`/all-courses/${course._id}`}>
            <Button className="mt-4 mb-2 bg-secondary">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
