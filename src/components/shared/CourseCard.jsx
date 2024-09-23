import Image from "next/image";
import Link from "next/link";

function CourseCard({ course }) {
  return (
    <div className="w-full max-w-md mx-auto md:mx-0 border rounded-xl bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white shadow-md">
      <Image
        className="w-full h-[270px] rounded-xl object-cover"
        src={course.courseImage}
        alt={course.courseName}
        width={400}
        height={270}
      />

      <div className="p-4">
        <p className="text-primary">{course.category}</p>
        <h3 className="text-lg font-semibold mb-2">{course.courseName}</h3>
        <p className="text-sm">{course.authorName}, {course.authorTitle}</p>

        <Link
          className="inline-block bg-primary mt-4 text-white px-4 py-3 rounded-xl hover:opacity-80 transition-opacity"
          href={`/course-details/${course.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;