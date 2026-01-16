"use client"
import { useQuery } from "@tanstack/react-query";
import StatCards from "./StatCards";
import TopCoursesChart from "./TopCoursesChart";
import UserAmountPieChart from "./UserAmountPieChart";
import Loading from "@/app/loading";

function Info() {
  // get stats
  const { data: statsData, isLoading, refetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin-stats`
      );
      return res.json();
    },
  });
  
  if (isLoading) {return <Loading/> }
  return (
    <div>
      <StatCards statsData={statsData} />
      <div className="grid lg:grid-cols-[6fr_4fr] gap-5 mt-10">
        <TopCoursesChart chartData={statsData.count3DaysCourses} />
        <UserAmountPieChart userTypes={statsData.userTypes} />
      </div>
    </div>
  );
}

export default Info;