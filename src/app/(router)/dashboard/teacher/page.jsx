"use client";

import React from "react";
import { 
  Eye, 
  TrendingUp,
  BookOpen,
  Users,
  Video,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const TeacherDashboard = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Fetch teacher's courses to get the actual count
  const { data: courses, isLoading } = useQuery({
    queryKey: ["teacher-courses", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      const res = await fetch(
        `/api/manage-courses?email=${userEmail}`
      );
      return res.json();
    },
    enabled: !!userEmail,
  });

  // Statistics data
  const stats = [
    {
      id: 1,
      title: "Total enrolled",
      value: "842",
      change: "+12.5%",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Course views",
      value: "3,284",
      change: "+5.2%",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 3,
      title: "Own Active course",
      value: isLoading ? "..." : (courses?.length || 0).toString(),
      change: "+1",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      title: "Completion Rate",
      value: "78%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  // Quick actions matching sidebar
  const quickEditSections = [
    { id: 1, title: "My courses", icon: BookOpen, path: "/dashboard/teacher/my-courses" },
    { id: 2, title: "Add live class", icon: Video, path: "/dashboard/teacher/liveClassAdd" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-[fadeInDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Welcome Back, <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{user?.fullName || "Instructor"}</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Here&apos;s an overview of your teaching performance and course engagement.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-[fadeInUp_0.6s_ease-out] border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-[fadeInUp_0.6s_ease-out]">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickEditSections.map((section) => (
              <Link
                href={section.path || "#"}
                key={section.id}
                className="flex items-center gap-6 p-8 bg-gray-50 hover:bg-purple-50 rounded-2xl transition-all duration-300 group border border-gray-100 hover:border-purple-200 hover:shadow-md"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <section.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-800 group-hover:text-purple-700 font-bold text-xl block">
                    {section.title}
                  </span>
                  <p className="text-gray-500 group-hover:text-purple-600/70 text-sm mt-1">
                    {section.id === 1 ? "View and edit your published courses" : "Schedule a new live session for students"}
                  </p>
                </div>
                <BarChart3 className="w-6 h-6 text-gray-300 group-hover:text-purple-300 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;
