"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Video, Calendar, User, Tag, Trash2, ShieldCheck, Clock, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import NoDataFound from "@/app/noDataFound";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const LiveClassList = () => {
  const queryClient = useQueryClient();
  const { data: liveClasses, isLoading } = useQuery({
    queryKey: ["admin-live-classes"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/live_classes`);
      if (!res.ok) throw new Error("Failed to fetch live classes");
      return res.json();
    },
  });

  const terminateMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/live_classes?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to terminate class");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-live-classes"]);
      Swal.fire({
        title: "Terminated!",
        text: "The live session has been successfully removed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Failed to terminate session", "error");
    }
  });

  const handleTerminate = (id, name) => {
    Swal.fire({
      title: "Terminate Session?",
      text: `Are you sure you want to terminate "${name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Terminate",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        terminateMutation.mutate(id);
      }
    });
  };

  const getStatus = (liveTimeStr) => {
    try {
      const parts = liveTimeStr.split(', ');
      if (parts.length < 2) return { label: "Active", color: "emerald", isExpired: false };
      
      const timePart = parts[0]; 
      const datePart = parts[1]; 
      
      // Now expecting datePart to include year if the user follows the new placeholder
      // If no year is provided, it will fallback to current behavior or naturally fail gracefully
      const dateStr = `${datePart} ${timePart}`;
      const liveDate = new Date(dateStr);
      
      if (isNaN(liveDate.getTime())) return { label: "Active", color: "emerald", isExpired: false };
      
      const isExpired = liveDate < new Date();
      return isExpired 
        ? { label: "Expired", color: "slate", isExpired: true }
        : { label: "Active", color: "emerald", isExpired: false };
    } catch (e) {
      return { label: "Active", color: "emerald", isExpired: false };
    }
  };

  if (isLoading) return <Loading />;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Live Classes</h1>
            </div>
            <p className="text-gray-500 font-medium">Monitor and oversee all ongoing and scheduled live interactive sessions.</p>
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 uppercase">Total Sessions</p>
              <p className="text-xl font-bold text-blue-600">{liveClasses?.length || 0}</p>
            </div>
            <div className="w-[1px] h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 uppercase">Active Now</p>
              <p className="text-xl font-bold text-emerald-500">
                {liveClasses?.filter(c => !getStatus(c.liveTime).isExpired).length || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Live Session Info</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Instructor</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Schedule</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {liveClasses?.length > 0 ? (
                  liveClasses.map((item, index) => {
                    const status = getStatus(item.liveTime);
                    return (
                      <motion.tr 
                        key={item._id || index}
                        variants={itemVariants}
                        className={`transition-all duration-300 ${status.isExpired ? 'bg-gray-50/30 grayscale-[0.3]' : 'hover:bg-blue-50/30'}`}
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                              <Image
                                src={item.thumbnail?.startsWith("http") ? item.thumbnail : "/assets/3dEdu.webp"}
                                alt={item.courseName}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="max-w-[240px]">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 ${status.isExpired ? 'bg-gray-200 text-gray-600' : 'bg-blue-50 text-blue-600'} text-[10px] font-bold rounded-md uppercase tracking-wide`}>
                                  {item.category}
                                </span>
                              </div>
                              <h3 className={`font-bold ${status.isExpired ? 'text-gray-500' : 'text-gray-800'} line-clamp-1 text-sm md:text-base leading-tight`}>
                                {item.courseName}
                              </h3>
                              <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                                {status.isExpired ? (
                                  <Clock className="w-3 h-3" />
                                ) : (
                                  <ShieldCheck className="w-3 h-3 text-green-500" />
                                )}
                                {status.isExpired ? "Session Ended" : "Verified Session"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full ${status.isExpired ? 'bg-gray-300' : 'bg-gradient-to-br from-blue-500 to-indigo-600'} flex items-center justify-center text-white font-bold text-xs`}>
                              {item.authorName?.charAt(0)}
                            </div>
                            <div>
                              <div className={`font-semibold ${status.isExpired ? 'text-gray-500' : 'text-gray-800'} text-sm`}>
                                {item.authorName}
                              </div>
                              <div className="text-xs text-gray-400 font-medium truncate max-w-[150px]">
                                {item.authorEmail || "Verified Instructor"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col gap-1.5">
                            <div className={`flex items-center gap-2 text-sm font-semibold ${status.isExpired ? 'text-gray-400' : 'text-gray-700'}`}>
                              <Calendar className={`w-4 h-4 ${status.isExpired ? 'text-gray-300' : 'text-blue-500'}`} />
                              {item.liveTime}
                            </div>
                            {!status.isExpired && (
                              <div className="text-xs text-emerald-500 font-medium flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Upcoming / Live
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                            status.isExpired 
                              ? 'bg-gray-100 text-gray-500 border-gray-200' 
                              : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          } text-xs font-bold border`}>
                             <div className={`w-2 h-2 rounded-full ${status.isExpired ? 'bg-gray-400' : 'bg-emerald-500'}`} />
                             {status.label}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          {status.isExpired ? (
                            <button 
                              onClick={() => handleTerminate(item._id, item.courseName)}
                              className="inline-flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 transition-colors font-medium text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleTerminate(item._id, item.courseName)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-sm shadow-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 group"
                            >
                              <AlertTriangle className="w-4 h-4" />
                              Terminate
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-6 bg-gray-50 rounded-full">
                          <Video className="w-12 h-12 text-gray-300" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">No Live Classes</h3>
                          <p className="text-gray-500">There are currently no scheduled live sessions found.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveClassList;


