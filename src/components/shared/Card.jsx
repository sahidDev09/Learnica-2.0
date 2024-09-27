import Image from "next/image";
import Link from "next/link";

const Card = ({ course }) => {
  const validThumbnail =
    course.thumbnail.startsWith("/") || course.thumbnail.startsWith("http")
      ? course.thumbnail
      : "/default-thumbnail.jpg";

  return (
    <div>
      <div className="w-full mx-auto md:mx-0 border rounded-xl bg-card text-gray-800 dark:bg-gray-800 dark:text-white shadow-md">
        <Image
          className="w-full h-[270px] rounded-xl object-cover"
          src={validThumbnail}
          alt={course.title}
          width={1000}
          height={1000}
        />

        <div className="p-4">
          <p className="text-primary">{course.category}</p>
          <h3 className="text-lg font-semibold my-1">
            {course.title.length > 35
              ? `${course.title.slice(0, 35)}...`
              : course.title}
          </h3>
          <p>
            <span className="text-gray-500">Release Date 12-05-2024</span>
          </p>
          <p className="text-sm">
            Author: <span className="font-semibold">{course.authorName}</span>
          </p>

          <Link
            className="inline-block bg-primary mt-4 text-white px-4 py-3 rounded-xl hover:opacity-80 transition-opacity"
            href={`/course-details/${course.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
