import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  Video 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState(1);

  const sideNavMenu = [
    {
      id: 1,
      name: "Dashboard",
      icons: LayoutDashboard,
      path: "/dashboard/admin",
    },
    {
      id: 2,
      name: "Courses",
      icons: BookOpen,
      path: "/dashboard/admin/manage-courses",
    },
    {
      id: 3,
      name: "Custom Topics",
      icons: FileText,
      path: "/dashboard/admin/custom-topics",
    },
    {
      id: 4,
      name: "Total Users",
      icons: Users,
      path: "/dashboard/admin/all-users",
    },
    {
      id: 5,
      name: "Total QNA",
      icons: MessageSquare,
      path: "/dashboard/admin/qna",
    },
    {
      id: 6,
      name: "Successful Orders",
      icons: ShoppingCart,
      path: "/dashboard/admin/orders",
    },
    {
      id: 7,
      name: "Live Class",
      icons: Video,
      path: "/dashboard/admin/live-class",
    },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div className="bg-white shadow-lg border-r border-gray-200 h-screen">
      {/* Logo Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-6">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-white font-bold text-xl">Learnica Admin</h1>
          </div>
        </Link>
      </div>

      {/* Menu List */}
      <div className="p-4 mt-4">
        {sideNavMenu.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            onClick={() => handleItemClick(item.id)}>
            <div
              className={`group flex gap-3 mt-2 p-3 text-[15px] items-center rounded-lg transition-all ease-in-out duration-200 cursor-pointer
                ${
                  activeItem === item.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}>
              <item.icons 
                className={`w-5 h-5 transition-transform duration-200 ${
                  activeItem === item.id ? "" : "group-hover:scale-110"
                }`} 
              />
              <h2 className="font-medium">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
