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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-courses?email=${userEmail}`
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

  if (user?.unsafeMetadata?.role !== "teacher") {
    return null;
  }

  return (
    <div className=" mt-10">
      <Card
        className="m-6 md:m-4 overflow-x-scroll md:overflow-hidden
      ">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My own courses</CardTitle>
            <Link href="/add-course">
              <Button className=" bg-primary">
                <Plus /> Add course
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {courses?.length > 0 ? (
            <table className="table border my-4">
              <thead>
                <tr className="bg-secondary text-white text-base">
                  <th>#</th>
                  <th>Course Title</th>
                  <th>Students</th>
                  <th>Revenue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((item, index) => (
                  <tr
                    key={index}
                    className="transition-all ease-in-out duration-300 hover:rounded-md text-lg">
                    <td>{index + 1}</td>
                    <td>
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
                          <div className="font-bold">
                            {item.name.length > 20
                              ? `${item.name.slice(0, 20)}...`
                              : item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>376</td>
                    <td>{item.pricing} $</td>
                    <td>
                      <div className="flex gap-4">
                        <Link href={"/add-course"}>
                          <Button className=" bg-card text-secondary hover:text-white border border-secondary border-opacity-15">
                            <Edit /> Edit
                          </Button>
                        </Link>
                        <Link href={`/all-courses/${item._id}`}>
                          <Button className="bg-secondary">
                            <Eye />
                          </Button>
                        </Link>

                        <Button
                          className=" bg-primary"
                          onClick={() => handleDelete(item._id)}>
                          <Trash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoDataFound />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCourses;
