/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useCallback } from "react";
import { FaTags, FaPlus } from "react-icons/fa";
import Courses from "./Courses";
import Pagination from "./Pagination";
import Loading from "../loading";
import Link from "next/link";
import debounce from "lodash.debounce";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(6);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const { user } = useUser();

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      category: selectedCategory,
      search: search.trim(),
    });

    if (user?.primaryEmailAddress?.emailAddress) {
      queryParams.append("email", user.primaryEmailAddress.emailAddress);
    }

    const res = await fetch(`/api/courses?${queryParams.toString()}`);
    const data = await res.json();

    setProducts(Array.isArray(data.products) ? data.products : []);
    setTotalProducts(data.totalProducts || 0);
    if (data.categories) {
      setCategories(data.categories);
    }

    setLoading(false);
  }, [page, size, selectedCategory, search, user]);

  const debouncedFetchCourses = useCallback(debounce(fetchCourses, 500), [
    fetchCourses,
  ]);

  useEffect(() => {
    debouncedFetchCourses();
    return debouncedFetchCourses.cancel;
  }, [debouncedFetchCourses]);

  useEffect(() => {
    const fetchInitialCategories = async () => {
      setLoading(true);
      const res = await fetch("/api/courses?page=1&size=1000");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
      setLoading(false);
    };

    fetchInitialCategories();
  }, []);

  const handleSearchChange = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setPage(1);
    setSelectedCategory(category);
  };

  if (loading && products.length === 0) {
    return <Loading />;
  }

  return (
    <div className="bg-card px-4">
      <div className="container mx-auto">
        <header className="text-center md:text-left text-sm flex items-center justify-between flex-wrap">
          <h2 className="text-md md:text-2xl font-bold hidden md:block">
            All Courses
          </h2>
          {/* ----- search ------ */}
          <div className="my-6">
            {/* <label className="input rounded-3xl border-transparent flex items-center gap-2"> */}
            <label className="block relative rounded-full bg-white">
              <input
                type="text"
                className="lg:w-96 text-black text-base py-1 md:py-2 px-6 bg-transparent outline-0 border-2 rounded-full shadow"
                placeholder="Search Something....."
                value={search}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6 text-primary self-center absolute top-1.5 md:top-2.5 right-3">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          {/* ---- Add Courses Button ------- */}
          <div className="flex justify-end">
            {user?.unsafeMetadata?.role === "teacher" && (
              <Link href="add-course">
                <Button className="bg-secondary">
                  <FaPlus />
                  Add Course
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* Category Filter */}
        <div className="lg:flex justify-between mt-4">
          <div>
            <section>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => handleCategorySelect("")}
                  className={`flex text-sm items-center gap-2 p-2 px-4 rounded-full transition-transform md:text-lg ${
                    selectedCategory === ""
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}>
                  <FaTags />
                  All
                </button>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                    className={`flex text-sm items-center gap-2 p-2 px-4 rounded-full transition-transform md:text-lg ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-secondary text-white"
                    }`}>
                    <FaTags />
                    {category}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Courses and Pagination */}
        <Courses products={products} loading={loading} />
        <Pagination
          totalItems={totalProducts}
          itemsPerPage={size}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Page;
