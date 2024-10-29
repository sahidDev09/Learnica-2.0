"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaChessKing, FaDownload } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AllUsers = () => {
  const [showModal, setShowModal] = useState(null);
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/alluser`
      );
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/admin/${user._id}`)
      .then((res) => {
        if (
          res.status === 200 &&
          res.data.message === "User successfully promoted to admin"
        ) {
          refetch();
          Swal.fire({
            title: "Success",
            text: `${user.name} is now an admin!`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to promote the user to admin",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "An error occurred while promoting the user",
          icon: "error",
        });
      });
  };

  const handleBlockUsers = (user) => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/block/${user._id}`)
      .then((res) => {
        if (
          res.status === 200 &&
          res.data.message === "User blocked successfully"
        ) {
          refetch();
          Swal.fire({
            title: "Success",
            text: `${user.name} has been blocked successfully.`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to block the user",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "An error occurred while blocking the user",
          icon: "error",
        });
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Card className=" m-4 mt-10 md:mt-0">
        <CardHeader>
          <CardTitle>Total User {users.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" overflow-x-auto">
            <table className="table border my-4">
              <thead>
                <tr className=" bg-secondary text-white">
                  <th>#</th>
                  <th>User Profile</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              src={user.photo}
                              alt={`${user.name}'s avatar`}
                              width={48}
                              height={48}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold flex gap-1">
                            {user.firstName}
                            <span>{user.lastName}</span>
                          </div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${
                          user.status === "blocked"
                            ? "bg-red-100"
                            : "bg-green-100"
                        } p-2 rounded-full`}>
                        {user.status ? user.status : "active"}
                      </span>
                    </td>
                    <td>
                      {user.mainRole === "admin" ? (
                        <button
                          className="btn bg-secondary text-white"
                          data-tooltip-id="user-tooltip"
                          data-tooltip-content="Admin">
                          <FaChessKing />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdmin(user)}
                          className="btn bg-secondary bg-opacity-25 hover:bg-primary hover:text-white"
                          data-tooltip-id="user-tooltip"
                          data-tooltip-content="Make Admin">
                          <RiAdminFill />
                        </button>
                      )}
                    </td>
                    <th className="flex gap-2 justify-center">
                      {user.status === "blocked" ? (
                        <button
                          disabled
                          className="btn bg-red-100 hover:bg-primary"
                          data-tooltip-id="user-tooltip"
                          data-tooltip-content="Blocked">
                          <MdBlockFlipped />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockUsers(user)}
                          className="btn bg-red-100 hover:bg-primary hover:text-white"
                          data-tooltip-id="user-tooltip"
                          data-tooltip-content="Block">
                          <MdBlockFlipped />
                        </button>
                      )}

                      <button
                        className="btn bg-secondary hover:bg-opacity-75 hover:bg-secondary text-white"
                        onClick={() => setShowModal(user)}>
                        See info
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="font-bold text-lg">User Information</h3>
            <Image
              className="w-40 max-h-40 object-cover rounded-2xl border border-blue-300 p-1"
              src={showModal.image}
              alt={showModal.name}
              width={160}
              height={160}
            />
            <p className="font-semibold">Name: {showModal.name}</p>
            <p>Email: {showModal.email}</p>
            <p>
              Status: <span className="text-green-400">{showModal.status}</span>
            </p>
            <p>District: {showModal.district}</p>
            <p>Upazila: {showModal.upazila}</p>
            <button className="btn mt-4" onClick={() => setShowModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
      <Tooltip id="user-tooltip"></Tooltip>
    </div>
  );
};

export default AllUsers;
