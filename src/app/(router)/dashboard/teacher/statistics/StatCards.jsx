import Link from "next/link";
import { StatCard1, StatCard2, StatCard3, StatCard4, StatCard5 } from "./StatCard";

function StatCards({ statsData }) {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/all-courses"><StatCard1 data={statsData.totalCourses} title={"Courses"}  /></Link>
      <Link href="/all-courses"><StatCard2
        data={statsData.totalCustomCourses}
        title={"Custom Topics"}
        
      /></Link>
      <Link href="/all-courses"><StatCard3 data={statsData.totalUsers} title={"Total Users"} 
       /></Link>
     <Link href="/all-courses"><StatCard4 data={statsData.totalQnA} title={"Total QnA"} /></Link> 
     <Link href="/all-courses"><StatCard5
        data={statsData.totalSuccessfulOrders}
        title={"Successful Orders"} 
        
      /></Link>
    </div>
  );
}

export default StatCards;
