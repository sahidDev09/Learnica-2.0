"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Loading from "@/app/loading";

const Card = ({ course, btnDetailsText }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  if (!course) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 group border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="relative overflow-hidden h-52">
        <Image
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={course?.additionalInfo?.image}
          alt={course?.name}
          width={400}
          height={300}
        />
        <div className="absolute top-4 left-4">
          <p className="text-white text-xs font-bold uppercase tracking-wider bg-primary/90 backdrop-blur-md rounded-lg px-3 py-1 shadow-lg">
            {course.category}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-slate-800 line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
          {course.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
            <Image 
              src={course.author?.profile || "/assets/profile.png"} 
              alt={course.author?.name} 
              width={32} 
              height={32}
              className="object-cover"
            />
          </div>
          <p className="text-sm text-slate-500 font-medium">
            By <span className="text-slate-900">{course.author.name}</span>
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          {!btnDetailsText ? (
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Price</span>
              <p className="text-2xl font-black text-secondary">${course.pricing}</p> 
            </div>
          ) : <div />}
          
          <Link href={`/all-courses/${course._id}`}>
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl px-6 py-2 h-auto font-bold transition-all hover:translate-x-1 shadow-lg shadow-secondary/20">
              {btnDetailsText ? btnDetailsText : "View Details"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
