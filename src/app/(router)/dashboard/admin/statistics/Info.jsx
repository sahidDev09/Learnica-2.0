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
        process.env.NEXT_PUBLIC_BASE_URL + `/api/admin-stats`
      );
      return res.json();
    },
  });
  
  if (isLoading) {return <Loading/> }
  return (
    <div>
      <StatCards statsData={statsData} />
      <div className="grid lg:grid-cols-[6fr_4fr] gap-8 mt-10">
        <TopCoursesChart />
        <UserAmountPieChart userTypes={statsData.userTypes} />
      </div>
    </div>
  );
}

export default Info;