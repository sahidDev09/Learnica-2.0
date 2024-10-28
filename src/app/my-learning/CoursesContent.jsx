import Loader from "@/components/shared/Loader";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

function CoursesContent({ user }) {
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  // get notes
  const { data: courses, isLoading, refetch } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        `/api/my-courses?email=${userEmail}`
      );
      return res.json();
    },
  });
  console.log('courses', courses);


  if (isLoading) { return <Loader /> }
  return (
    <div className="border-2 rounded-md mt-3 p-4">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary">My Courses</h3>
    </div>
  );
}

export default CoursesContent;