import { 
  LayoutDashboard, 
  BookOpen, 
  Video 
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const sideNavMenu = [
  {
    id: 1,
    name: "Dashboard",
    icons: LayoutDashboard,
    path: "/dashboard/teacher",
  },
  {
    id: 2,
    name: "My courses",
    icons: BookOpen,
    path: "/dashboard/teacher/my-courses",
  },
  {
    id: 3,
    name: "Add live class",
    icons: Video,
    path: "/dashboard/teacher/liveClassAdd",
  },
];

const TeacherSidebar = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    const active = sideNavMenu.find(item => item.path === pathname);
    if (active) {
      setActiveItem(active.id);
    }
  }, [pathname]);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div className="bg-white shadow-lg border-r border-gray-100 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 bg-[#135276]">
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <h1 className="text-white text-2xl font-bold">Learnica Teacher</h1>
          </div>
        </Link>
      </div>

      {/* Menu List */}
      <div className="px-4 flex-1">
        {sideNavMenu.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            onClick={() => handleItemClick(item.id)}>
            <div
              className={`group flex gap-3 mt-2 p-4 text-[15px] items-center rounded-2xl transition-all duration-300 cursor-pointer
                ${
                  activeItem === item.id
                    ? "bg-[#135276] text-white shadow-lg shadow-purple-100"
                    : "text-gray-500 hover:bg-[#135276]/30 hover:text-[#135276]"
                }`}>
              <item.icons 
                className={`w-5 h-5 transition-all duration-300 ${
                  activeItem === item.id ? "" : "group-hover:scale-110"
                }`} 
              />
              <h2 className="font-semibold tracking-wide">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherSidebar;
