import React from "react";
import AddCourse from "../../page"; // Ensure this imports the correct component
import { useQuery } from "@tanstack/react-query";

const Update = ({ updateid }) => {
  const {
    data: singleCourse,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["courses", updateid],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${updateid}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching course data: {error.message}</div>;

  console.log(singleCourse, "data from single update page");

  return (
    <div>
      <AddCourse courseData={singleCourse} />
    </div>
  );
};

export default Update;
