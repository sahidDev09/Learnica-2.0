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
        `/api/my-learning?email=${userEmail}`
      );
      return res.json();
    },
  });

  if (isLoading) { return <Loader /> }
  return (
    <div className="border-2 rounded-md mt-3 px-4 pb-6 pt-4">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-secondary">My Courses</h3>

      {courses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => <Card key={course._id} course={course} btnDetailsText={"Continue"} />)}
        </div>
      ) : (
        <p className="text-xl md:text-2xl p-6 pl-0 font-semibold text-gray-500">No courses have been bought yet!</p>
      )}
    </div>
  );
}

export default CoursesContent;