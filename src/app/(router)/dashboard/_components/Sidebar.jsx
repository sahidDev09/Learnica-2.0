import { BookAIcon, BookCopy, Database } from "lucide-react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const sideNavMenu = [
    {
      id: 1,
      name: "Course Management",
      icons: BookCopy,
      path: "/course"
    },
    {
      id: 2,
      name: "My Analytics",
      icons: Database,
    },
  ];

  return (
    <div className="bg-card shadow-sm border h-screen">
      <div className="bg-secondary">
        <Image
          src="/assets/learnicaNavlogo.png"
          className="w-40 p-5 flex mx-auto"
          alt="logo"
          width={100}
          height={100}
        />
      </div>

      {/* menu list */}

      <div className="p-5 mt-5">
        {sideNavMenu.map((item, index) => (
          <div
            className="group flex gap-3 mt-1 p-3 text-[18px] items-center hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-200"
            key={item.id}>
            <item.icons className="group-hover:animate-bounce" />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
