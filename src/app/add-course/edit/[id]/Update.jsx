"use client";
import React from "react";
import AddCourse from "../../page";
import { useQuery } from "@tanstack/react-query";
import NewCourse from "../../New-course/NewCourse";
import Loading from "@/app/loading";

const Update = ({ courseParamsId }) => {
  const { data: courseInfo, isLoading } = useQuery({
    queryKey: ["courseInfo", courseParamsId],
    queryFn: async () => {
      const res = await fetch(
        `/api/courses/${courseParamsId}`
      );

      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <NewCourse myCourse={courseInfo} />
    </div>
  );
};

export default Update;
