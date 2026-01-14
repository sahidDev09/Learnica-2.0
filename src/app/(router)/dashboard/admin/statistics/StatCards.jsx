import Link from "next/link";
import { StatCard1, StatCard2, StatCard3, StatCard5 } from "./StatCard";

function StatCards({ statsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <Link href="/all-courses"><StatCard1 data={statsData.totalCourses} title={"Courses"}  /></Link>
      <Link href="/custom-course"><StatCard2
        data={statsData.totalCustomCourses}
        title={"Custom Topics"}
        
      /></Link>
      <Link href="/dashboard/admin/all-users"><StatCard3 data={statsData.totalUsers} title={"Total Users"} 
       /></Link>
      <StatCard5
        data={statsData.totalSuccessfulOrders}
        title={"Successful Orders"} 
        
      />
    </div>
  );
}

export default StatCards;
