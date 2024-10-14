import { BookAIcon, BookCopy, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(1);

  const sideNavMenu = [
    {
      id: 1,
      name: "Course Management",
      icons: BookCopy,
      path: "/course",
    },
    {
      id: 2,
      name: "My Analytics",
      icons: Database,
      path: "/analysis",
    },
  ];

  return (
    <div className="bg-card shadow-sm border h-screen mt-10 md:mt-0">
      <div className="bg-secondary">
        <Link href="/">
          <Image
            src="/assets/learnicaNavlogo.png"
            className="w-40 p-5 flex mx-auto"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      {/* menu list */}
      <div className="p-5 mt-5">
        {sideNavMenu.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            onClick={() => handleItemClick(item.id)}
          >
            <div
              className={`group flex gap-3 mt-1 p-3 text-[18px] items-center rounded-md transition-all ease-in-out duration-200 
                ${
                  activeItem === item.id
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary hover:text-white"
                }`}
            >
              <item.icons className="group-hover:animate-bounce" />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
