import Link from "next/link";
import Card from "../shared/Card";

const getCourses = async() => {
  const res = await fetch ("http://localhost:3000/api/courses")
  const courses = res.json()
  return courses;
}


const LatestCourses = async() => {
  const courses = await getCourses()
  console.log(courses);
  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-6 text-center md:text-left">
          <p className="text-lg text-primary">New</p>
          <h2 className="text-3xl md:text-4xl font-bold">Latest courses</h2>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.slice(0,3).map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            className="inline-block bg-primary text-white px-8 py-3 rounded-full shadow-md hover:opacity-80 transition-opacity"
            href="/all-courses">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestCourses;
