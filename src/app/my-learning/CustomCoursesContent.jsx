import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
          {customCourses?.map(course => (
            <div key={course._id} className="bg-card p-6 rounded-md border-2 border-secondary">
              <h3 className="text-lg font-semibold mb-1 text-secondary">
                {course.title.length > 35
                  ? `${course.title.slice(0, 35)}...`
                  : course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Total class: <span className="font-semibold">{course.items?.length}</span>
              </p>
              <div className="flex items-center justify-between gap-4">
                <Link href={`/`}>
                  <Button className="mt-4 mb-2 bg-secondary">Continue</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl md:text-2xl p-6 pl-0 font-semibold text-gray-500">No custom courses have been bought yet!</p>
      )}
    </div>
  );
}

export default CustomCoursesContent;