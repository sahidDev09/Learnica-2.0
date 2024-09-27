import { FaTags } from 'react-icons/fa';

import Link from "next/link";

function Categories() {
  const categories = [
    {id: '1', category: 'programming'},
    {id: '2', category: 'marketing'},
    {id: '3', category: 'data science'},
    {id: '4', category: 'self development'},
  ]

  return (  
    <section className="px-4 p-8 md:py-12">
      <div className="container mx-auto">
        <header className="mb-6 text-center md:text-left">
          <p className="text-lg text-primary">All</p>
          <h2 className="text-3xl md:text-4xl font-bold">Categories</h2>
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
  );
}

export default Categories;