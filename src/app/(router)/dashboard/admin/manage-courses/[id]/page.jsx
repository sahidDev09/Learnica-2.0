"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const EditCoursePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricing: "",
    category: "",
    level: "",
    image: "",
    authorName: "",
  }); 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-courses?id=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        
        // Flatten nested objects for form state if needed, or keep structure
        setFormData({
          ...data,
          // Handle specific nested fields if necessary for inputs
          image: data.additionalInfo?.image || "",
          authorName: data.author?.name || "",
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load course data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Reconstruct nested objects before sending
    const payload = {
      ...formData,
      additionalInfo: {
        ...formData.additionalInfo,
        image: formData.image
      },
      author: {
        ...formData.author,
        name: formData.authorName
      }
    };
    
    // Remove temporary flat fields
    delete payload.image;
    delete payload.authorName;
    delete payload._id; // Ensure _id is not sent

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-courses?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to update course");
      
      Swal.fire("Success", "Course updated successfully", "success");
      router.push("/dashboard/admin/manage-courses");
      router.refresh();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update course", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Course</h1>
          <p className="text-gray-500">Update course details and content</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Enter course title"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Course description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                name="pricing"
                value={formData.pricing || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="e.g. Web Development"
              />
            </div>
            
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Author Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="https://..."
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                name="level"
                value={formData.level || "Beginner"}
                onChange={handleChange}
                 className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
              </select>
            </div>
            
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Chapters</label>
              <input
                type="number"
                name="totalChapters"
                readOnly
                value={formData.chapters?.length || 0}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">To edit chapters, use the dedicated curriculum editor.</p>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
