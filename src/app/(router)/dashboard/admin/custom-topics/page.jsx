"use client";
import React, { useState } from "react";
import { FileText, Plus, Search, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

// Mock data for development
const mockTopics = [
  {
    id: 1,
    title: "Advanced React Patterns",
    category: "Development",
    requests: 45,
    status: "Active",
    author: "Sahidul Islam",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "UI/UX Design Principles",
    category: "Design",
    requests: 32,
    status: "Pending",
    author: "Jane Doe",
    date: "2024-03-14"
  },
  {
    id: 3,
    title: "Next.js 14 Masterclass",
    category: "Development",
    requests: 28,
    status: "Active",
    author: "John Smith",
    date: "2024-03-12"
  },
  {
    id: 4,
    title: "Digital Marketing Basics",
    category: "Marketing",
    requests: 15,
    status: "Inactive",
    author: "Sarah Connor",
    date: "2024-03-10"
  },
  {
    id: 5,
    title: "Python for Data Science",
    category: "Data Science",
    requests: 67,
    status: "Active",
    author: "Alan Turing",
    date: "2024-03-08"
  }
];

const CustomTopics = () => {
  const [topics, setTopics] = useState(mockTopics);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        setTopics(topics.filter(t => t.id !== id));
        Swal.fire("Deleted!", "Topic has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Custom Topics</h1>
          <p className="text-gray-600">Manage requested and custom learning topics</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
          <Plus size={20} />
          <span>Add New Topic</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 font-medium cursor-pointer hover:border-purple-300 transition-colors">
              Filter by Status
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
                <th className="p-5 font-semibold">Topic Name</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Requests</th>
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-purple-50 transition-colors duration-200">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{topic.title}</div>
                          <div className="text-xs text-gray-500">by {topic.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                        {topic.category}
                      </span>
                    </td>
                    <td className="p-5 text-gray-600 font-medium">
                      {topic.requests} students
                    </td>
                    <td className="p-5 text-gray-500 text-sm">
                      {topic.date}
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        topic.status === 'Active' ? 'bg-green-100 text-green-700' :
                        topic.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {topic.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(topic.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No topics found matching your search.
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

export default CustomTopics;
