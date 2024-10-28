import { useQuery } from "@tanstack/react-query";
import Card from "@/components/shared/Card";
import Loader from "@/components/shared/Loader";

function CoursesContent({ user }) {
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  // get notes
  const { data: courses, isLoading } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        `/api/my-courses?email=${userEmail}`
      );
      return res.json();
    },
  });

  if (isLoading) { return <Loader /> }
  return (
    <div className="border-2 rounded-md mt-3 px-4 pb-6 pt-4">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-secondary">My Courses</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0
            ? courses.map(course => <Card key={course._id} course={course} />)
            : null
          }
        </div>
    </div>
  );
}

export default CoursesContent;