import Link from "next/link";
import { FaTags } from "react-icons/fa";
import Courses from "./Courses";

const page = () => {
  const categories = [
    { id: "1", category: "programming" },
    { id: "2", category: "marketing" },
    { id: "3", category: "data science" },
    { id: "4", category: "self development" },
    { id: "5", category: "python" },
    { id: "6", category: "UX/UI" },
    { id: "7", category: "development" },
  ];

  return (
    <div className="bg-card px-4">
      <div className="max-w-screen-xl mx-auto">
        <header className="text-center md:text-left py-6">
          <h2 className="text-3xl md:text-4xl font-bold">All Courses</h2>
        </header>

        {/* categories and search part */}
        <div className="lg:flex justify-between">
          {/* Categories */}
          <div>
            <section>
              <div>
                <div className="flex gap-4 flex-wrap">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={"/all-courses"}
                      className="flex text-sm items-center gap-2 text-white bg-primary py-3 px-5 rounded-full hover:scale-105 transition-transform md:text-lg">
                      <FaTags />
                      {cat.category}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
          {/* search */}
          <div className="px-4 p-8 md:mt-10">
            <label className="input rounded-3xl  border-transparent flex items-center gap-2">
              <input
                type="text"
                className="lg:w-80  text-gray-300 flex-1"
                placeholder="Search Something....."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-6 w-6  text-primary">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* all courses */}
      <Courses />
    </div>
  );
};

export default page;
