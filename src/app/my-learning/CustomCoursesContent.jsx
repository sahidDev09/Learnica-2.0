import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";

function CustomCoursesContent({ user }) {
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  // get notes
  const { data: customCourses, isLoading } = useQuery({
    queryKey: ["my-custom-courses"],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        `/api/my-learning?email=${userEmail}&type=custom`
      );
      return res.json();
    },
  });

  if (isLoading) { return <Loader /> }  
  return (
    <div className="border-2 rounded-md mt-3 px-4 pb-6 pt-4">
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-secondary">My Custom Courses</h3>

      {customCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          custom courses cards
        </div>
      ) : (
        <p className="text-xl md:text-2xl p-6 pl-0 font-semibold text-gray-500">No custom courses have been bought yet!</p>
      )}
    </div>
  );
}

export default CustomCoursesContent;