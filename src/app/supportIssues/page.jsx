"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

const InstructorSupportIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIssues = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/submitIssue", {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch issues');
      }

      const data = await res.json();
      setIssues(data.data); // Store fetched issues
    } catch (err) {
      console.error(err);
      setError('Error fetching issues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteIssue = async (id) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/submitIssue?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete issue');
      }

      // Remove the deleted issue from the state
      setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== id));

      Swal.fire('Deleted!', 'Issue has been deleted.', 'success');
    } catch (err) {
      console.error('Error deleting issue:', err);
      Swal.fire('Error', 'Failed to delete issue. Please try again.', 'error');
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF5722',
      cancelButtonColor: '#BDBDBD',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIssue(id);
      }
    });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-500 h-screen">Loading issues...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-lg text-red-500">{error}</div>;
  }

  // Sort issues by createdAt in ascending order (oldest first)
  const sortedIssues = [...issues].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className=' bg-secondary'>
      <div className="bg-gradient-to-r max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  min-h-screen shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-10">Support Issues</h1>

      {sortedIssues.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No support issues found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gradient-to-r from-green-300 to-blue-400">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">#</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Issue Type</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Issue Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Student Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Student Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Submitted Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedIssues.map((issue, index) => (
                <tr key={issue._id} className="hover:bg-yellow-100 transition">
                  <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-800">{issue.selectedOption}</td>
                  <td className="py-3 px-4 text-gray-800">{issue.issueText}</td>
                  <td className="py-3 px-4 text-gray-800">{issue.studentName}</td>
                  <td className="py-3 px-4 text-gray-800">{issue.studentEmail}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(issue.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => confirmDelete(issue._id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default InstructorSupportIssues;
