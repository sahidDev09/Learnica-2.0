"use client";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useUser } from "@clerk/nextjs"; // Import the Clerk hook
// for add course button 
import { FaPlus } from "react-icons/fa";




const CourseManagement = () => {
  const { user } = useUser(); // Get the logged-in user from Clerk
  const userEmail = user?.primaryEmailAddress?.emailAddress; // Get the email address

  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses", userEmail], // Depend on the email in the query
    queryFn: async () => {
      if (!userEmail) return []; // If no email, return an empty array

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-courses?.author?.email=${userEmail}`
      );
      return res.json();
    },
  });

  const handleDelete = (id) => {
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
        fetch(`/api/manage-courses?id=${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire("Deleted!", "Successfully deleted.", "success");
              refetch(); // Reload data after deletion
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
    return <Loading />;
  }
  // for add course button 
  if (user?.unsafeMetadata?.role !== "teacher") {
    return null; // Do not render if the user is not a teacher
  }

  return (
    <div className="m-4 mt-10 md:mt-0">
      <div className="overflow-x-auto px-2 py-6">
        <div className=" flex justify-between bg-white">
          <div className=" text-2xl font-bold  to-black ml-4 mt-2"> My Courses</div>
          <div> 
            {/* Add Courses Button */}
        <div className="flex justify-end">
          {user?.unsafeMetadata?.role === "teacher" && (
            <Link href="/add-course">
              <button className="text-sm flex items-center gap-2 p-2 px-4 text-white bg-primary rounded-xl hover:scale-105 transition-transform md:text-lg">
                <FaPlus />
                Add Course
              </button>
            </Link>
          )}
        </div>
          </div>
        </div>
        <table className="table shadow-xl">
          <thead>
           
            <tr className="bg-white  text-lg">
              <th className="">Sl</th>
              <th className="">Course Title</th>
              <th className="">Buyer</th>
              <th className="">Price</th>
              <th className="">Status</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((item, index) => (
              <tr
                key={index}
                className=" transition-all ease-in-out duration-300 hover:rounded-md  text-lg"
              >
                <td className="">{index + 1}</td>
                <td className="">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 border-2">
                        <Image
                          src={item.additionalInfo?.image}
                          alt={item.title}
                          width={50}
                          height={80}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name.length > 20
              ? `${item.name.slice(0, 20)}...`
              : item.name}</div>
                      <div className="text-sm opacity-50">
                       
                      </div>
                    </div>
                  </div>
                </td>

                <td className="">376</td>
                <td className="">{item.pricing} $</td>
                <td className="">{item.status || "Published"}</td>

                <td className="">
                  <div className="flex gap-4">
                    <Link href={`/all-courses/${item._id}`}>
                      <BiSolidShow className="text-2xl" />
                    </Link>
                    <button onClick={() => handleDelete(item._id)}>
                      <MdDelete className="text-2xl text-primary" />
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

export default CourseManagement;
