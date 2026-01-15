"use client"
import Link from "next/link";
import { StatCard1, StatCard2, StatCard3, StatCard5 } from "./StatCard";

function StatCards({ statsData }) {
  if (!statsData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href="/dashboard/teacher/my-courses">
        <StatCard1 data={statsData.totalCourses} title="Courses" />
      </Link>
      <Link href="#">
        <StatCard2
          data={statsData.totalCustomCourses || 0}
          title="Custom Topics"
        />
      </Link>
      <Link href="#">
        <StatCard3 data={statsData.totalUsers} title="Total Users" />
      </Link>
      <StatCard5
        data={statsData.totalSuccessfulOrders || 0}
        title="Successful Orders"
      />
    </div>
  );
}

export default StatCards;
