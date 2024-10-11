'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import sup from '/public/assets/support.png'
import Swal from 'sweetalert2';

const Support = ({showSupportModal, setShowSupportModal, user}) => {
    
   

    const [selectedOption, setSelectedOption] = useState("");
    const [issueText, setIssueText] = useState("");
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
  





    // modal --------------------------------------------------
  
  const handleSupportModalClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowSupportModal(false); // Close modal when clicked outside
    }
  };
  // modal form when there is session

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    checkFormValidation(e.target.value, issueText);
  };

  const handleIssueChange = (e) => {
    const text = e.target.value;
    setIssueText(text);
    checkFormValidation(selectedOption, text);
    setShowWarning(text.length < 20); // Show warning if less than 20 characters
  };

  const checkFormValidation = (option, text) => {
    if (option && text.length >= 20) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      selectedOption,
      issueText,
      studentName: user?.fullName || "", // This will be filled from the API or Clerk
      studentId: user?.id || "", // Use user ID from Clerk
      studentEmail: user?.primaryEmailAddress?.emailAddress || "",
    };

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/submitIssue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit the issue");
      }

      // Open the Leave/Join modal upon successful submission
      // If the submission is successful, show the two buttons
      setFormSubmitted(true);
      // Reset form fields
      setSelectedOption("");
      setIssueText("");
      setIsButtonActive(false); // Deactivate the submit button since the form is reset
      setShowWarning(false); // Reset any warnings
    } catch (err) {
      console.error(err);
      setError("Failed to submit the issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to leave?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Left!", "You have exited the modal.", "success");

        setShowSupportModal(false);
        setFormSubmitted(false); // Redirect or close the modal, for example, redirect to the home page
      }
    });
  };

  const handleJoinNow = () => {
    const meetLink = "https://meet.google.com/wou-cmvs-qsa"; // Replace with your meet link
  };

    return (
        <div>
           {/* Support Modal */}
      {showSupportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop:blur-3xl "
          onClick={handleSupportModalClose} // Close modal when clicked outside
        >
          <div className="relative p-6 rounded-lg w-96 lg:w-[600px] border-2 bg-white">
            {/* Close Button */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold mb-4">Support Session</h2>
              </div>
              <div>
                {" "}
                <button
                  className=" text-black btn btn-sm btn-ghost"
                  onClick={() => setShowSupportModal(false)} // Close modal button
                >
                  ✕
                </button>
              </div>
            </div>
            <hr />
            {/* when there is support session available */}
            <div>
              <div>
                {/* Show form if not submitted */}
                {!formSubmitted && (
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto bg-white pt-2 ">
                    <div className=" lg:flex justify-between pb-3 font-bold">
                      <p className="font-bold">Ongoing Support Session</p>
                      <p>
                        Session Time :{" "}
                        <span className="text-purple-800">9:00 PM</span> to{" "}
                        <span className="text-purple-800">11:00 PM</span>
                      </p>
                    </div>
                    <hr className=" pt-3" />
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      <span className=" text-green-500">To get support,</span>{" "}
                      <span className=" text-orange-500">
                        Submit Your Issue first
                      </span>
                    </h2>

                    {/* Dropdown for selecting option */}
                    <div className="mb-4">
                      <label
                        htmlFor="issue-type"
                        className="block text-gray-700 mb-2">
                        Select Issue Type
                        <span className="text-orange-500">*</span>
                      </label>
                      <select
                        id="issue-type"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500">
                        <option value="">Select an option</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing Issue</option>
                        <option value="account">Account Issue</option>
                      </select>
                    </div>

                    {/* Textarea for issue description */}
                    <div className="mb-4">
                      <label
                        htmlFor="issue-description"
                        className="block text-gray-700 mb-2">
                        Describe Your Issue (1-250 characters)
                        <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        id="issue-description"
                        value={issueText}
                        onChange={handleIssueChange}
                        maxLength={250}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500"></textarea>
                      <p className="text-right text-sm text-gray-600 mt-1">
                        {issueText.length}/250 characters
                      </p>
                      {showWarning && (
                        <p className="text-red-500 text-sm mt-2">
                          Type at least 20 characters
                        </p>
                      )}
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Submit and Cancel buttons */}
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        disabled={!isButtonActive || loading}
                        className={`w-1/2 p-3 mt-4 text-white font-bold rounded-md mr-2 
              ${
                isButtonActive
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}>
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSupportModal(false)} // Close modal button
                        className="w-1/2 p-3 mt-4 text-white font-bold bg-red-500 hover:bg-red-600 rounded-md">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Show buttons after form submission */}
                {formSubmitted && (
                  <div>
                    <div className=" flex justify-center">
                      <Image
                        src={sup}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-48 h-60"
                      />
                    </div>
                    <p className="text-center p-2">
                      <span>
                        Instructor name: <span>Numan</span>{" "}
                      </span>
                    </p>
                    <hr />
                    <p className="text-center p-2">
                      <span>
                        Your Serial No: <span>10</span>{" "}
                      </span>
                    </p>
                    <hr />
                    <h1 className="text-center p-2">
                      To get support join quickly
                    </h1>
                    <div className="flex justify-center mt-8">
                      <div>
                        <button
                          onClick={handleLeave}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mx-2">
                          Leave
                        </button>
                      </div>
                      <div>
                        <Link href="https://meet.google.com/wou-cmvs-qsa">
                          {" "}
                          <button
                            onClick={handleJoinNow}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mx-2">
                            Join Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* if there has no support session */}
            <div className="hidden">
              <p className="mt-4 text-orange-600  text-center font-bold text-2xl">
                No Support Session is Ongoing Now!!!
              </p>

              <div className="mt-4">
                <h3 className="text-xl p-1 font-bold text-center bg-slate-200 text-green-600">
                  Daily Support Session Time
                </h3>
                <ul className=" font-bold mt-6 gap-3">
                  <div className=" flex justify-between gap-3">
                    <li className=" bg-gray-100 rounded-lg p-1 pl-2 pr-2">
                      <strong>Morning:</strong> 11:00 AM to 1:00 PM
                    </li>
                    <li className=" bg-gray-100 rounded-lg p-1 pl-2 pr-2">
                      <strong>Afternoon:</strong> 4:00 PM to 6:00 PM
                    </li>
                  </div>
                  <li className=" bg-gray-100 rounded-lg p-1 pl-2 pr-2 mt-3 flex justify-center">
                    <strong>Night: </strong> 9:00 PM to 11:00 PM
                  </li>
                </ul>
              </div>

              <hr className="mt-4" />
              <p className="mt-2 text-xl text-red-500 text-center">
                <strong>Note:</strong> There is no morning session on Fridays.
              </p>
            </div>
          </div>
        </div>
      )} 
        </div>
    );
};

export default Support;