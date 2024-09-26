import Card from "@/components/shared/Card";

const getCourses = async () => {
  const res = await fetch("http://localhost:3000/api/courses");
  const courses = res.json();
  return courses;
};

const Courses = async () => {
  const courses = await getCourses();
  console.log(courses);
  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course, index) => (
            <Card key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
