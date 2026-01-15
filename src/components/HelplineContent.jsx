"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// Adjust paths as necessary
import sup from "/public/assets/support.png";
import Swal from "sweetalert2";
import { Button } from "./ui/button";
import { useExpandableScreen } from "./ui/expandable-screen";
import { Loader2, Send } from "lucide-react";

const HelplineContent = ({ user }) => {
  const { collapse } = useExpandableScreen();
  const [selectedOption, setSelectedOption] = useState("");
  const [issueText, setIssueText] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [issues, setIssues] = useState([]);
  const [supportLinks, setSupportLinks] = useState([]);

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
  // data fetch for serial

  const fetchIssues = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/submitIssue",
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await res.json();
      setIssues(data.data); // Store fetched issues
    } catch (err) {
      console.error(err);
      setError("Error fetching issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIssues(); // Fetch issues on component mount
  }, []);

  // data fetch for meet link
  const fetchLink = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/addSupportLink",
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch links");
      }

      const data = await res.json();
      setSupportLinks(data.data); // Store fetched links
    } catch (err) {
      console.error(err);
      setError("Error fetching links. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLink(); // Fetch Link on component mount
  }, []);

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
        Swal.fire("Left!", "You have exited the help-line.", "success");

        collapse(); // Close the modal
        setFormSubmitted(false);
        // Reload the page after deletion
        window.location.reload(); // Reload the page
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-full bg-background text-foreground">
      {/* Left Column: Visual/Image */}
      <div className="w-full md:w-1/2 bg-slate-900 relative flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-black"></div>
         
         <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-8 relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <Image
                    src={sup}
                    alt="Support Team"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              We&apos;re Here to <span className="text-blue-400">Help</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-md leading-relaxed">
              Facing an issue? Our dedicated support team is ready to assist you in real-time.
            </p>
         </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-1/2 bg-white dark:bg-zinc-950 flex flex-col p-6 md:p-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Help-Line Support</h2>
             <p className="text-slate-500 dark:text-slate-400">Fill out the form below to connect with an agent.</p>
          </div>

          {/* Session Status or Form */}
          {supportLinks.length > 0 ? (
            <div className="space-y-6">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                   {/* Session Info Card */}
                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex justify-between items-center text-sm md:text-base">
                      <div className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Ongoing Session
                      </div>
                      <div className="text-blue-700 dark:text-blue-300">
                        <span className="font-bold">9:00 PM</span> - <span className="font-bold">11:00 PM</span>
                      </div>
                   </div>

                   <hr className="border-slate-100 dark:border-zinc-800" />

                   <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="issue-type" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                           Issue Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="issue-type"
                          value={selectedOption}
                          onChange={handleOptionChange}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                          <option value="">Select an option</option>
                          <option value="technical">Technical Issue</option>
                          <option value="billing">Billing Issue</option>
                          <option value="account">Account Issue</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between">
                            <label htmlFor="issue-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                               Description <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-slate-400">{issueText.length}/250</span>
                         </div>
                        <textarea
                          id="issue-description"
                          value={issueText}
                          onChange={handleIssueChange}
                          maxLength={250}
                          rows={5}
                          placeholder="Please describe your issue in detail..."
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        ></textarea>
                         {showWarning && (
                           <p className="text-xs text-red-500 font-medium">
                             Please provide at least 20 characters description.
                           </p>
                         )}
                      </div>
                   </div>

                   {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>}

                   <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={!isButtonActive || loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                      >
                        {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</>
                        ) : (
                            <><Send className="mr-2 h-4 w-4" /> Submit Request</>
                        )}
                      </Button>
                   </div>
                </form>
              ) : (
                <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-8 h-8 text-green-600" />
                    </div>
                    {supportLinks.map((links) => (
                    <div key={links._id} className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Request Submitted!</h3>
                      
                      <div className="bg-slate-50 dark:bg-zinc-900 rounded-xl p-6 space-y-4 text-left">
                          <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3">
                              <span className="text-slate-500">Instructor:</span>
                              <span className="font-semibold text-slate-900 dark:text-white">{links.instructorName}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3">
                              <span className="text-slate-500">Your Ticket Pos:</span>
                              <span className="font-bold text-blue-600">#{issues.length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                              <span className="text-slate-500">Est. Wait Time:</span>
                              <span className="font-semibold text-slate-900 dark:text-white">~{issues.length * 5} mins</span>
                          </div>
                      </div>

                      <div className="flex flex-col gap-3">
                         <Link href={links.meetLink} target="_blank">
                            <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                               Join Session Now
                            </Button>
                         </Link>
                         <Button
                            variant="destructive"
                            onClick={handleLeave}
                            className="w-full"
                         >
                            Cancel Request & Leave
                         </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce mr-1"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce mr-1 delay-100"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Active Session</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                    Our support team is currently offline. Please check back during our scheduled hours.
                </p>

                <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-6 w-full text-left">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Support Hours
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex justify-between">
                        <span>Morning</span>
                        <span className="font-mono font-medium">11:00 AM - 01:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Afternoon</span>
                        <span className="font-mono font-medium">04:00 PM - 06:00 PM</span>
                    </li>
                    <li className="flex justify-between pt-2 border-t border-slate-200 dark:border-zinc-800 font-semibold text-blue-600">
                        <span>Night</span>
                        <span className="font-mono">09:00 PM - 11:00 PM</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-slate-400 italic text-center">
                     *No morning session on Fridays
                  </p>
                </div>
                
                <Button onClick={collapse} variant="outline" className="mt-8">
                     Close Window
                </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelplineContent;
