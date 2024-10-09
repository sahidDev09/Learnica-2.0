"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const CoursesPage = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-courses`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return "Loading..";
  }

  return (
    <div>
      <div className="flex text-xl font-semibold justify-start my-4">
        Total Courses:{courses.length}
      </div>
      <table className="overflow-x-scroll shadow-md border mx-auto my-6">
        <thead>
          <tr className="bg-card text-primary">
            <th className="py-4 px-6 text-lg text-left border-b">Sl</th>
            <th className="py-4 px-6 text-lg text-left border-b">Image</th>
            <th className="py-4 px-6 text-lg text-left border-b">Owner</th>
            <th className="py-4 px-6 text-lg text-left border-b">Title</th>
            <th className="py-4 px-6 text-lg text-left border-b">Category</th>
            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-primary hover:text-white border-b py-1 my-1"
            >
              <td className="px-3 text-lg font-medium text-center h-20 ">
                {index + 1}
              </td>
              <td className="px-3 text-lg font-medium h-20 ">
                <Image
                  src={item.thumbnail || "/assets/aboutBrandimage.png"}
                  alt={item.title || "Course image"}
                  width={50}
                  height={80}
                  className="object-cover w-20 h-20 rounded-full p-1"
                />
              </td>
              <td className="px-3 text-lg font-medium h-20 ">
                {item.authorName || "Unknown"}
              </td>
              <td className="px-3 h-20 ">{item.title?.slice(0, 80)}..</td>
              <td className="px-3 text-lg font-medium h-20 ">
                {item.category || "Unknown"}
              </td>

              <td className="px-3 text-lg font-medium text-center h-20 flex gap-2 justify-center items-center">
                <Link href={`/all-courses/${item._id}`}>
                  <BiSolidShow className="text-2xl" />
                </Link>
                <Link href={"/"}>
                  <MdDelete className="text-2xl" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPage;