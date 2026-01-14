"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaChessKing } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { X } from "lucide-react";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import Loading from "@/app/loading";

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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Total Users</h1>
        <p className="text-gray-600">Manage all registered users on the platform</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">User List</h2>
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
            {users.length} Users
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
                <th className="p-5 font-semibold">#</th>
                <th className="p-5 font-semibold">User Profile</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Role</th>
                <th className="p-5 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-purple-50 transition-colors duration-200">
                  <td className="p-5 text-gray-500 font-medium">{index + 1}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                        <Image
                          src={user.photo || "/default-avatar.png"}
                          alt={`${user.name}'s avatar`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 flex items-center gap-1">
                          {user.firstName}
                          <span className="text-gray-800">{user.lastName}</span>
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "blocked"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {user.status ? user.status : "Active"}
                    </span>
                  </td>
                  <td className="p-5">
                    {user.mainRole === "admin" ? (
                      <button
                        className="bg-purple-50 text-purple-600 p-2 rounded-lg cursor-default"
                        data-tooltip-id="user-tooltip"
                        data-tooltip-content="Admin"
                      >
                        <FaChessKing className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAdmin(user)}
                        className="bg-gray-100 text-gray-500 p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        data-tooltip-id="user-tooltip"
                        data-tooltip-content="Promote to Admin"
                      >
                        <RiAdminFill className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      {user.status === "blocked" ? (
                        <button
                          disabled
                          className="bg-red-50 text-red-300 p-2 rounded-lg cursor-not-allowed"
                          data-tooltip-id="user-tooltip"
                          data-tooltip-content="Already Blocked"
                        >
                          <MdBlockFlipped className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlockUsers(user)}
                          className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                          data-tooltip-id="user-tooltip"
                          data-tooltip-content="Block User"
                        >
                          <MdBlockFlipped className="w-5 h-5" />
                        </button>
                      )}

                      <button
                        className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                        onClick={() => setShowModal(user)}
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-purple-600 p-4 flex justify-between items-center">
              <h3 className="font-bold text-white text-lg">User Profile</h3>
              <button 
                onClick={() => setShowModal(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full border-4 border-purple-50 shadow-md mb-3">
                  <Image
                    className="rounded-full object-cover"
                    src={showModal.image || "/default-avatar.png"}
                    alt={showModal.name}
                    fill
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-800">{showModal.name}</h4>
                <p className="text-gray-500 text-sm">{showModal.email}</p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="text-green-600 font-medium text-sm bg-green-50 px-2 py-0.5 rounded-full">
                    {showModal.status || "Active"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500 text-sm">District</span>
                  <span className="text-gray-800 font-medium text-sm">
                    {showModal.district || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Upazila</span>
                  <span className="text-gray-800 font-medium text-sm">
                    {showModal.upazila || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Tooltip id="user-tooltip" className="z-50" />
    </div>
  );
};

export default AllUsers;
