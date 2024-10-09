"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const CoursesPage = () => {
  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-courses`
      );
      return res.json();
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/all-courses?id=${id}`, {
          // Use the correct API route
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.message) {
              Swal.fire("Deleted!", "Successfully deleted.", "success");
              refetch(); // If you have a refetch function, it will reload the data
            } else {
              Swal.fire("Error!", "Something went wrong.", "error");
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Failed to delete the course.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return "Loading..";
  }

  return (
    <div>
      <div className="flex text-xl font-semibold justify-start my-4 p-4">
        Total Courses:{courses.length}
      </div>

      <div className="overflow-x-auto px-2 py-6">
        <table className="table shadow-xl">
          <thead>
            <tr className="bg-card text-primary text-xl">
              <th className="">Sl</th>
              <th className="">Owner</th>
              <th className="">Title</th>
              <th className="">Category</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-primary hover:text-white text-lg"
              >
                <td className="">{index + 1}</td>
                <td className="">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 border-2">
                        <Image
                          src={item.authorPhotoUrl || "/assets/profile2.jpg"}
                          alt={item.title}
                          width={50}
                          height={80}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.authorName}</div>
                      <div className="text-sm opacity-50">
                        {item.authorEmail}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="">{item.title?.slice(0, 80)}..</td>
                <td className="">{item.category || "Unknown"}</td>

                <td className="">
                  <div className="flex gap-4">
                    <Link href={`/all-courses/${item._id}`}>
                      <BiSolidShow className="text-2xl" />
                    </Link>
                    <button onClick={() => handleDelete(item._id)}>
                      <MdDelete className="text-2xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesPage;
