"use client";
import Link from "next/link";
import { FaTags } from "react-icons/fa";
import { useEffect, useState } from "react";
import Courses from "./Courses";
import Pagination from "./Pagination";

const Page = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/courses");
        const data = await res.json();
        const uniqueCategories = [
          ...new Set(data.map((course) => course.category)),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-card px-4">
      <div className="container mx-auto">
        <header className="text-center md:text-left text-sm flex items-center justify-between">
          <h2 className="text-md md:text-2xl font-bold hidden md:inline">All Courses</h2>
          <div className="px-4 p-8 md:mt-10">
            <label className="input rounded-3xl border-transparent flex items-center gap-2">
              <input
                type="text"
                className="lg:w-80 text-gray-300 flex-1"
                placeholder="Search Something....."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 text-primary">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </header>
        {/* Categories and search part */}
        <div className="lg:flex justify-between">
          {/* Categories */}
          <div>
            <section>
              <div>
                <div className="flex gap-4 flex-wrap">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/all-courses?category=${category}`}
                      className="flex text-sm items-center gap-2 p-2 px-4 text-white bg-primary rounded-full hover:scale-105 transition-transform md:text-lg">
                      <FaTags />
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
          {/* Search */}
        </div>
      </div>
      {/* courses */}
      <Courses />
      <Pagination />
    </div>
  );
};

export default Page;
