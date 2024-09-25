
import Link from "next/link";
import { FaTags } from "react-icons/fa";


const page = () => {
    const categories = [
        {id: '1', category: 'programming'},
        {id: '2', category: 'marketing'},
        {id: '3', category: 'data science'},
        {id: '4', category: 'self development'},
        {id: '5', category: 'python'},
        {id: '6', category: 'UX/UI'},
        {id: '7', category: 'development'},
      ]
    return (
        <div className="bg-card">
            <div className="container mx-auto ">
            {/* categories and search part */}
            <div className="lg:flex justify-between">
                {/* Categories */}
                <div>
                <section className="px-4 p-8 md:py-8">
      <div className="">
        <header className="mb-6 text-center md:text-left">
          <h2 className="text-3xl md:text-3xl font-bold">Categories:</h2>
        </header>

        <div className="flex gap-4 flex-wrap">
          {categories.map(cat => (
            <Link key={cat.id} href={"/all-courses"} className="flex items-center gap-2 text-white font-semibold bg-primary py-3 px-5 rounded-full hover:scale-105 transition-transform md:text-lg">
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
  <input type="text" className="lg:w-80  text-gray-300" placeholder="Search Something....." />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-6 w-6  text-primary">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
                </div>
            </div>
        </div>
        </div>
    );
};

export default page;