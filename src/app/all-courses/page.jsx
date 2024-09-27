"use client";
import { useEffect, useState } from "react";
import { FaTags, FaPlus } from "react-icons/fa";
import Courses from "./Courses";
import Pagination from "./Pagination";
import Loading from "../loading";
import Link from "next/link";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        const uniqueCategories = [
          ...new Set(data.map((course) => course.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const CategoryButton = ({ category }) => (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`flex text-sm items-center gap-2 p-2 px-4 text-white bg-primary rounded-full hover:scale-105 transition-transform md:text-lg ${
        selectedCategory === category ? "bg-secondary" : ""
      }`}>
      <FaTags />
      {category || "All"}
    </button>
  );

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-card px-4">
      <div className="container mx-auto">
        <header className="text-center md:text-left text-sm flex items-center justify-between">
          <h2 className="text-md md:text-2xl font-bold hidden md:inline">
            All Courses
          </h2>
          <div className="px-4 p-8 md:mt-10">
            <label className="input rounded-3xl border-transparent flex items-center gap-2">
              <input
                type="text"
                className="lg:w-80 text-black flex-1"
                placeholder="Search Something....."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        {/* Categories and Search */}
        <div className="lg:flex justify-between">
          <div>
            <section>
              <div className="flex gap-4 flex-wrap">
                <CategoryButton category="" />
                {categories.map((category, index) => (
                  <CategoryButton key={index} category={category} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Add Courses Button */}
        <div className="flex justify-end mt-4">
          <Link href="add-course">
            <button className="text-sm flex items-center gap-2 p-2 px-4 text-white bg-primary rounded-xl hover:scale-105 transition-transform md:text-lg">
              <FaPlus />
              Add Course
            </button>
          </Link>
        </div>
      </div>

      {/* Courses and Pagination */}
      <Courses selectedCategory={selectedCategory} searchQuery={searchQuery} />
      <Pagination />
    </div>
  );
};

export default Page;
