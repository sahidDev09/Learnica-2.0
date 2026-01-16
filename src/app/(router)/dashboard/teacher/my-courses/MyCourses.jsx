"use client";
import Loading from "@/app/loading";
import NoDataFound from "@/app/noDataFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

const MyCourses = () => {
  const { user } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];

      const res = await fetch(
        `/api/manage-courses?email=${userEmail}`
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
          <p className="text-gray-600">Manage and track your published courses</p>
        </div>
        <Link href="/add-course">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 rounded-xl px-6 py-6 shadow-lg shadow-purple-200 transition-all duration-300">
            <Plus size={20} /> Add course
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <th className="p-5 font-semibold">#</th>
                <th className="p-5 font-semibold">Course Details</th>
                <th className="p-5 font-semibold">Students</th>
                <th className="p-5 font-semibold">Revenue</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses?.length > 0 ? (
                courses.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="p-5 text-gray-500 font-medium">{index + 1}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                          <Image
                            src={item.additionalInfo?.image || "/default-image.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {item.name.length > 30
                              ? `${item.name.slice(0, 30)}...`
                              : item.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Level: {item.difficulty || "All Levels"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-gray-600 font-medium">376</td>
                    <td className="p-5 text-gray-800 font-bold">
                      {item.pricing ? `$${item.pricing}` : "Free"}
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Approved" || item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected" || item.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <Link href={`/add-course/edit/${item._id}`}>
                          <Button 
                            variant="ghost" 
                            className="bg-purple-50 text-purple-600 p-2 rounded-lg hover:bg-purple-100 transition-colors h-10 w-10"
                          >
                            <Edit size={18} />
                          </Button>
                        </Link>
                        <Link href={`/all-courses/${item._id}`}>
                          <Button 
                            variant="ghost" 
                            className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors h-10 w-10"
                          >
                            <Eye size={18} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors h-10 w-10"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
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

export default MyCourses;
