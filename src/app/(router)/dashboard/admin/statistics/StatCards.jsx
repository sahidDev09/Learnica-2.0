import { DarkStatCard, LightStatCard } from "./StatCard";

function StatCards({statsData}) {
  return (
    <div className="flex gap-6 flex-wrap">
      <DarkStatCard data={statsData.totalCourses} title={"Courses"} />
      <LightStatCard data={statsData.totalCustomCourses} title={"Custom Topics"} />
      <DarkStatCard data={statsData.totalUsers} title={"Total Users"} />
      <LightStatCard data={statsData.totalQnA} title={"Total QnA"} />
      <DarkStatCard data={statsData.totalSuccessfulOrders} title={"Successful Orders"} />
    </div>
  );
}

export default StatCards;