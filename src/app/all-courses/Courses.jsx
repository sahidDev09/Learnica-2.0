import CourseCard from "@/components/shared/CourseCard";

function Courses() {
  const courses = [
    {
      id: 1,
      courseName: "100 Days of Code: the Complete Python",
      category: "programming",
      authorName: "Dr. Angela Yu",
      authorTitle: "Developer and Lead Instructor",
      courseImage: "/assets/upCard1.jpg",
    },
    {
      id: 2,
      courseName: "100 Days of Code: the Complete Python",
      category: "programming",
      authorName: "Dr. Angela Yu",
      authorTitle: "Developer and Lead Instructor",
      courseImage: "/assets/upCard2.jpg",
    },
    {
      id: 3,
      courseName: "100 Days of Code: the Complete Python",
      category: "programming",
      authorName: "Dr. Angela Yu",
      authorTitle: "Developer and Lead Instructor",
      courseImage: "/assets/upCard3.jpg",
    },
    {
      id: 4,
      courseName: "100 Days of Code: the Complete Python",
      category: "programming",
      authorName: "Dr. Angela Yu",
      authorTitle: "Developer and Lead Instructor",
      courseImage: "/assets/upCard1.jpg",
    },
    {
      id: 5,
      courseName: "100 Days of Code: the Complete Python",
      category: "programming",
      authorName: "Dr. Angela Yu",
      authorTitle: "Developer and Lead Instructor",
      courseImage: "/assets/upCard2.jpg",
    },
    {
      id: 6,
      courseName: "100 Days of Code: the Complete Python",
      category: "programming",
      authorName: "Dr. Angela Yu",
      authorTitle: "Developer and Lead Instructor",
      courseImage: "/assets/upCard3.jpg",
    },
  ];

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
