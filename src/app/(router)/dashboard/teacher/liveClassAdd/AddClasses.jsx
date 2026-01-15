"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Video, Link as LinkIcon, Calendar, BookOpen, User, Mail, Hash } from "lucide-react";

export default function AddClasses() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    thumbnail: "",
    courseName: "",
    category: "",
    authorName: "",
    authorId: user?.id || "",
    authorEmail: user?.primaryEmailAddress?.emailAddress || "",
    liveLink: "",
    liveTime: "",
  });

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/courses"
        );
        const authorData = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          authorName: authorData.authorName || user?.fullName || "",
          authorId: authorData.authorId || user?.id || "",
          authorEmail:
            authorData.authorEmail ||
            user?.primaryEmailAddress?.emailAddress ||
            "",
        }));
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/add-classes",
        formData
      );
      
      Swal.fire({
        title: "Success!",
        text: "Live class has been added successfully!",
        icon: "success",
        confirmButtonColor: "#9333ea",
      });

      setFormData({
        thumbnail: "",
        courseName: "",
        category: "",
        authorName: user?.fullName || "",
        authorId: user?.id || "",
        authorEmail: user?.primaryEmailAddress?.emailAddress || "",
        liveLink: "",
        liveTime: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the live class.",
        icon: "error",
        confirmButtonColor: "#9333ea",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-[fadeInUp_0.6s_ease-out]">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Video className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Add Live Class</h2>
          </div>
          <p className="text-purple-100">Schedule a new live session for your students</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <LinkIcon className="w-4 h-4 text-purple-600" /> Thumbnail URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-purple-600" /> Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-purple-600" /> Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
                  placeholder="e.g. Development"
                  required
                />
              </div>

              <div className="relative group opacity-75">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" /> Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 outline-none"
                  disabled
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <LinkIcon className="w-4 h-4 text-purple-600" /> Live Stream Link
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
                  placeholder="https://zoom.us/..."
                  required
                />
              </div>

              <div className="relative group">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-600" /> Live Time
                </label>
                <input
                  type="text"
                  name="liveTime"
                  value={formData.liveTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
                  placeholder="e.g. 03:00 PM, 25 Sep 2026"
                  required
                />
              </div>

              <div className="relative group opacity-75">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-gray-500" /> Author ID
                </label>
                <input
                  type="text"
                  name="authorId"
                  value={formData.authorId}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 outline-none"
                  disabled
                />
              </div>

              <div className="relative group opacity-75">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Author Email
                </label>
                <input
                  type="email"
                  name="authorEmail"
                  value={formData.authorEmail}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 outline-none"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-purple-200 transition-all hover:-translate-y-1 active:scale-95"
            >
              Post Live Class
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
