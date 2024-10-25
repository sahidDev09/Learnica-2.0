"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { useUser } from "@clerk/clerk-react";

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

        // Set the fetched author data in the form
        setFormData((prevFormData) => ({
          ...prevFormData,
          authorName: authorData.authorName || user?.fullName || "", // Use API data or Clerk user name
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
  }, [user]); // Re-run the effect if the user data changes

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
      console.log("Course added successfully:", response.data);

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Live class has been added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      setFormData({
        thumbnail: "",
        courseName: "",
        category: "",
        authorName: user?.fullName || "", // Reset to the user's full name or empty string
        authorId: user?.id || "",
        authorEmail: user?.primaryEmailAddress?.emailAddress || "",
        liveLink: "",
        liveTime: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the live class.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 rounded-lg mb-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Add live class
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mt-4 lg:ml-32">
          <div>
            <label className="form-control w-full mb-1">Thumbnail:</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0"
              placeholder="Enter thumbnail URL"
              required
            />
          </div>

          <div>
            <label className="form-control w-full mb-1">Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0"
              placeholder="Enter course name"
              required
            />
          </div>

          <div>
            <label className="form-control w-full mb-1">Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0"
              placeholder="Enter course category"
              required
            />
          </div>

          <div>
            <label className="form-control w-full mb-1">Author Name:</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0  text-black font-semibold"
              placeholder="Enter author name"
              disabled // Disable input as it's fetched from the API or Clerk
            />
          </div>
        </div>
        <div className="mt-4 lg:mr-32">
          <div>
            <label className="form-control w-full mb-1">Live Link:</label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0"
              placeholder="Enter live class link"
              required
            />
          </div>

          <div>
            <label className="form-control w-full mb-1">Live Time:</label>
            <input
              type="text"
              name="liveTime"
              value={formData.liveTime}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0"
              placeholder="Enter live time (e.g., 03:00 PM, 25 Sept)"
              required
            />
          </div>
          <div>
            <label className="form-control w-full mb-1">Author ID:</label>
            <input
              type="text"
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0 text-black font-semibold"
              placeholder="Enter author ID"
              disabled // Disable input as it's fetched from Clerk
            />
          </div>

          <div>
            <label className="form-control w-full mb-1">Author Email:</label>
            <input
              type="email"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleChange}
              className="input input-bordered w-full min-w-0  text-black font-semibold"
              placeholder="Enter author email"
              disabled // Disable input as it's fetched from Clerk
            />
          </div>
        </div>

        <div className="flex justify-center w-full col-span-full">
          <button
            type="submit"
            className=" w-full md:w-1/2 bg-secondary text-white rounded-md py-2 hover:bg-secondary-dark hover:shadow-lg transition-all">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
