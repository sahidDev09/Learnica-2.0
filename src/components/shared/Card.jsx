import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Card = ({ course }) => {
  const validThumbnail =
    course.thumbnail.startsWith("/") || course.thumbnail.startsWith("http")
      ? course.thumbnail
      : "/default-thumbnail.jpg";

  return (
    <div className=" bg-card">
      <div className="w-full mx-auto md:mx-0 border rounded-xl text-gray-800 dark:bg-gray-800 dark:text-white shadow-md">
        <Image
          className="w-full h-[260px] rounded-xl object-fit"
          src={validThumbnail}
          alt={course.title}
          width={1000}
          height={1000}
        />

        <div className="p-4">
          <p className="text-white text-sm bg-primary rounded-full px-2 py-1 w-fit">
            {course.category}
          </p>
          <h3 className="text-lg font-semibold my-1 e">
            {course.title.length > 35
              ? `${course.title.slice(0, 35)}...`
              : course.title}
          </h3>
          <p>
            <span className="text-gray-500">Release Date 12-05-2024</span>
          </p>
          <p className="text-sm text-primary">
            Author: <span className="font-semibold">{course.authorName}</span>
          </p>

          <Link href={`/all-courses/${course._id}`}>
            <Button className="my-2 bg-secondary">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
