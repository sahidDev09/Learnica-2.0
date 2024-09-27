import Card from "@/components/shared/Card";

const getCourses = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/courses");
  const courses = res.json();
  return courses;
};

const Courses = async () => {
  const courses = await getCourses();

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
