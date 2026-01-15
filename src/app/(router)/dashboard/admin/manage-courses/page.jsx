"use client";
import Loading from "@/app/loading";
import NoDataFound from "@/app/noDataFound";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CoursesPage = () => {
  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-courses`
      );
      return res.json();
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-courses?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `Course status changed to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire("Error", data.error || "Failed to update status", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

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
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-courses?id=${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire("Deleted!", "Successfully deleted.", "success");
              refetch();
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

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Courses</h1>
        <p className="text-gray-600">Overview of all courses available on the platform</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <th className="p-5 font-semibold">#</th>
                <th className="p-5 font-semibold">Course & Author</th>
                <th className="p-5 font-semibold">Students</th>
                <th className="p-5 font-semibold">Price</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses?.length > 0 ? (
                courses?.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="p-5 text-gray-500 font-medium">{index + 1}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                          <Image
                            src={item?.additionalInfo?.image || "/default-image.jpg"}
                            alt={item?.title || "Course Image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {item?.name?.length > 30
                              ? `${item.name.slice(0, 30)}...`
                              : item?.name || "Unnamed Course"}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            by {item?.author?.name || "Unknown Author"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 text-gray-600 font-medium">376</td>
                    <td className="p-5 text-gray-800 font-bold">
                      {item?.pricing ? `$${item.pricing}` : "Free"}
                    </td>
                    <td className="p-5">
                      <Select
                        onValueChange={(value) =>
                          handleStatusChange(item._id, value)
                        }
                        defaultValue={
                          item.status
                            ? item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)
                            : "Pending"
                        }
                      >
                        <SelectTrigger
                          className={`w-[130px] h-8 text-xs font-semibold rounded-full border-none ${
                            item.status === "Approved" || item.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Rejected" || item.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="z-[99999]">
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-3">

                        <Link 
                          href={`/all-courses/${item?._id}`}
                          className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item?._id)}
                          className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete Course"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center">
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
