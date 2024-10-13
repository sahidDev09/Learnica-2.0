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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Support Issues</h1>

      {sortedIssues.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No support issues found.</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Issue Type</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Issue Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Student Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Student Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Submitted Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedIssues.map((issue, index) => (
                <tr key={issue._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{issue.selectedOption}</td>
                  <td className="py-3 px-4">{issue.issueText}</td>
                  <td className="py-3 px-4">{issue.studentName}</td>
                  <td className="py-3 px-4">{issue.studentEmail}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(issue.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => confirmDelete(issue._id)}
                      className="px-3 py-1 rounded hover:text-red-600"
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
  );
};

export default InstructorSupportIssues;
