"use client";

import React from "react";
import { 
  Eye, 
  MousePointerClick, 
  MessageSquare, 
  TrendingUp,
  BookOpen,
  Users,
  ShoppingCart,
  Video,
  FileText,
  MessageCircle,
  BarChart3
} from "lucide-react";

const AdminDashboard = () => {
  // Statistics data
  const stats = [
    {
      id: 1,
      title: "Total Views",
      value: "1,284",
      change: "+12.5%",
      icon: Eye,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Project Clicks",
      value: "432",
      change: "+5.2%",
      icon: MousePointerClick,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 3,
      title: "Inquiries",
      value: "12",
      change: "+2",
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      title: "Conversion",
      value: "3.2%",
      change: "+0.4%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  // Quick edit sections
  const quickEditSections = [
    { id: 1, title: "Update Hero Content", icon: BarChart3 },
    { id: 2, title: "Add New Project", icon: BookOpen },
    { id: 3, title: "Update Experience", icon: Users },
    { id: 4, title: "Edit About Bio", icon: FileText },
    { id: 5, title: "Manage Skills", icon: TrendingUp },
    { id: 6, title: "Update Education", icon: BookOpen },
    { id: 7, title: "GitHub Activity", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-[fadeInDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Welcome Back, <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Sahid</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Here&apos;s an overview of your portfolio performance and sections.
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Edit Sections */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-[fadeInLeft_0.6s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Edit Sections</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickEditSections.map((section, index) => (
                <button
                  key={section.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all duration-200 group border border-gray-200 hover:border-purple-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <section.icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium text-sm">
                    {section.title}
                  </span>
                  <BarChart3 className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-[fadeInRight_0.6s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Inquiries</h2>
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No new messages yet.</p>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-lg text-white animate-[fadeInUp_0.6s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Total Courses</h3>
            <p className="text-4xl font-bold">24</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-lg text-white animate-[fadeInUp_0.6s_ease-out]" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Growing</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Total Users</h3>
            <p className="text-4xl font-bold">1,547</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 shadow-lg text-white animate-[fadeInUp_0.6s_ease-out]" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <ShoppingCart className="w-8 h-8" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1">Successful Orders</h3>
            <p className="text-4xl font-bold">89</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
