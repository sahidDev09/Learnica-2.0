import Link from "next/link";
import CourseCard from "../shared/CourseCard";

function LatestCourses() {
  const latestCourses = [
    {id: 1, courseName: '100 Days of Code: the Complete Python', category: 'programming', authorName: 'Dr. Angela Yu', authorTitle: 'Developer and Lead Instructor', courseImage: '/assets/upCard1.jpg'},
    {id: 2, courseName: '100 Days of Code: the Complete Python', category: 'programming', authorName: 'Dr. Angela Yu', authorTitle: 'Developer and Lead Instructor', courseImage: '/assets/upCard2.jpg'},
    {id: 3, courseName: '100 Days of Code: the Complete Python', category: 'programming', authorName: 'Dr. Angela Yu', authorTitle: 'Developer and Lead Instructor', courseImage: '/assets/upCard3.jpg'},
    {id: 4, courseName: '100 Days of Code: the Complete Python', category: 'programming', authorName: 'Dr. Angela Yu', authorTitle: 'Developer and Lead Instructor', courseImage: '/assets/upCard1.jpg'},
    {id: 5, courseName: '100 Days of Code: the Complete Python', category: 'programming', authorName: 'Dr. Angela Yu', authorTitle: 'Developer and Lead Instructor', courseImage: '/assets/upCard2.jpg'},
    {id: 6, courseName: '100 Days of Code: the Complete Python', category: 'programming', authorName: 'Dr. Angela Yu', authorTitle: 'Developer and Lead Instructor', courseImage: '/assets/upCard3.jpg'},
  ]

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-6 text-center md:text-left">
          <p className="text-lg text-primary">New</p>
          <h2 className="text-3xl md:text-4xl font-bold">Latest courses</h2>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestCourses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>

        <Link
          className="inline-block bg-secondary mt-8 text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity"
          href={`/all-courses`}>
          View all
        </Link>
      </div>
    </section>
  );
}

export default LatestCourses;
