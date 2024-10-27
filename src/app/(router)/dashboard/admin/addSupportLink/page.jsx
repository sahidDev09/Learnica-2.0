'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AddInstructor = () => {
  const [instructorName, setInstructorName] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [existingInstructors, setExistingInstructors] = useState([]); // Store existing instructor data

  useEffect(() => {
    // Fetch the existing instructor data when the component mounts
    const fetchInstructors = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/addSupportLink', {
          method: 'GET',
        });
        const data = await res.json();
        if (res.ok) {
          setExistingInstructors(data.data || []); // Set the fetched data, defaulting to an empty array
        } else {
          throw new Error(data.message || 'Failed to fetch instructors');
        }
      } catch (err) {
        console.error('Error fetching instructors:', err);
        setError(err.message);
      }
    };

    fetchInstructors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
  
    const formData = {
      instructorName,
      meetLink,
    };
  
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/addSupportLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add instructor');
      }
  
      // Show success message
      setSuccess(true);
  
      // Reset form fields
      setInstructorName('');
      setMeetLink('');
  
      // Reload the page after adding the instructor
      window.location.reload(); // Reload the page after adding
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error adding instructor. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    // SweetAlert confirmation before deletion
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (confirmed.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addSupportLink`, {
          method: 'DELETE',
        });
  
        if (!res.ok) {
          throw new Error('Failed to delete instructor');
        }
  
        // Show success message
        Swal.fire('Deleted!', 'Instructor has been deleted.', 'success');
  
        // Reload the page after deletion
        window.location.reload(); // Reload the page
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error deleting instructor. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className='h-full'>
      <div className="max-w-md mx-auto mt-10 p-5 bg-secondary rounded-lg mb-6">
        <h2 className="text-2xl text-white font-bold mb-5">Instructor</h2>
        <div>
          {existingInstructors.length > 0 ? (
            existingInstructors.map((instructor) => (
              <div key={instructor._id} className="mb-5">
                <p className="text-white mb-2"><strong>Instructor Name:</strong> {instructor.instructorName}</p>
                <p className="text-white mb-2" title=" Click to join"><Link href={instructor.meetLink}><strong>Meet Link:</strong>{instructor.meetLink} </Link></p>
                <p className="text-white mb-2"><strong>Added:</strong> {formatDateTime(instructor.createdAt)}</p>
                <button
                  onClick={() => handleDelete(instructor._id)} // Pass instructor ID to delete
                  className="p-2 bg-red-500 text-white font-bold rounded"
                  disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-white mb-2">No instructors added yet.</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-white font-bold mb-5 text-center">Add Instructor and Link</h2>
          <div className="mb-4">
            <label htmlFor="instructorName" className="block text-white mb-2">
              Instructor Name
            </label>
            <input
              type="text"
              id="instructorName"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              className="w-full p-2 bg-cyan-800 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meetLink" className="block text-white mb-2">
              Meet Link
            </label>
            <input
              type="url"
              id="meetLink"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              className="w-full p-2 bg-cyan-800 text-white rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">Instructor added successfully!</p>}
          <div className=' flex justify-center'>
          <button
            type="submit"
            className="p-1 pl-6 pr-6 bg-green-600 text-white font-bold rounded"
            disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInstructor;
