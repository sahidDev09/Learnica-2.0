"use client";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useState, useEffect } from "react";
import DarkModeLogo from "../../../public/assets/learnicaNavlogo.png";
import sup from "../../../public/assets/support.png";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import {
  BriefcaseBusiness,
  FileStackIcon,
  HelpCircleIcon,
  MessageCircleCodeIcon,
  PenBox,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCashRegister } from "react-icons/fa";
import Loading from "@/app/loading";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false); // State for Support modal
  const [mainRole, setMainRole] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [issueText, setIssueText] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const search = useSearchParams();
  const router = useRouter();
  const { user } = useUser();

  const currUser = user?.primaryEmailAddress?.emailAddress;

  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayOut = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      router.replace("/", { scroll: false });
    }
  };

  useEffect(() => {
    const checkUserRole = async () => {
      if (user && !user?.unsafeMetadata?.role) {
        router.push("/onboarding");
      } else {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user, router]);

  // Fetch user data from your API using Clerk email
  useEffect(() => {
    const fetchUserData = async () => {
      if (currUser) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/user?email=${currUser}`
          );
          const data = await response.json();
          const currData = data;
          setMainRole(currData.mainRole);
          console.log("current data", currData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currUser]);

  if (loading) {
    return <Loading />;
  }

  // modal --------------------------------------------------
  const handleSupportModalOpen = () => setShowSupportModal(true); // Open modal
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

  //clerk

  return (
    <nav className="bg-secondary">
      <div className="sticky z-20 top-0 w-full container mx-auto text-white dark:bg-black">
        <div className="rounded-b-2xl flex mx-auto justify-between items-center py-2 md:py-5 px-3 md:px-0">
          <Link href={"/"}>
            <div>
              <Image
                src={DarkModeLogo}
                alt="Logo"
                width={100}
                height={100}
                className="w-40"
              />
            </div>
          </Link>
          <div>
            {/* Mobile menu icon */}
            <div className="block md:hidden lg:hidden">
              <IoMdMenu
                onClick={handleOpenMenu}
                className="text-4xl cursor-pointer"
              />
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block lg:block">
              <ul className="font-semibold flex gap-6">
                <Link
                  href="/"
                  className="duration-150 hover:border-transparent text-center p-1">
                  <li>Home</li>
                </Link>

                <Link
                  href="/all-courses"
                  className="duration-150 hover:border-transparent p-1 text-center">
                  <li>All Courses</li>
                </Link>
                <Link
                  href="/live_class"
                  className="duration-150 hover:border-transparent p-1 text-center">
                  <li>Live classes</li>
                </Link>
                <li
                  className="duration-150 hover:border-transparent p-1 text-center cursor-pointer"
                  onClick={handleSupportModalOpen} // Open support modal on click
                >
                  Support
                </li>
                <Link
                  href="/about"
                  className="duration-150 hover:border-transparent p-1 text-center">
                  <li>About Us</li>
                </Link>

                <li className="p-1">
                  {/* Dark Mode Toggle */}
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      className="theme-controller"
                      value="synthwave"
                    />
                    <svg
                      className="swap-off h-6 w-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    <svg
                      className="swap-on h-6 w-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                </li>
                {/* Authentication Buttons */}
                <div className="flex gap-5">
                  <SignedOut>
                    <Button
                      onClick={() => setShowSignIn(true)}
                      variant="secondary"
                      className="rounded-full">
                      Sign-in
                    </Button>
                  </SignedOut>

                  {/* author dashboard */}

                  {user && mainRole === "admin" ? (
                    <Link href="/dashboard/admin/manage-courses">
                      <Button
                        variant="destructive"
                        className="rounded-full"
                        aria-label="Author Dashboard">
                        <PenBox size={20} className="mr-2" /> Admin Dashboard
                      </Button>
                    </Link>
                  ) : user?.unsafeMetadata?.role === "teacher" ? (
                    <Link href="/dashboard/teacher">
                      <Button
                        variant="destructive"
                        className="rounded-full"
                        aria-label="Author Dashboard">
                        <PenBox size={20} className="mr-2" /> Author Dashboard
                      </Button>
                    </Link>
                  ) : null}

                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: " w-10 h-10",
                        },
                      }}>
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="My Purchases"
                          labelIcon={<BriefcaseBusiness size={15} />}
                          href="my-applications"></UserButton.Link>

                        <UserButton.Link
                          label="Payment History"
                          labelIcon={<FaCashRegister size={15} />}
                          href="paymentHistory"></UserButton.Link>

                        <UserButton.Link
                          label="Custom Course"
                          labelIcon={<FileStackIcon size={15} />}
                          href="/custom-course"></UserButton.Link>

                        <UserButton.Link
                          label="Chat with Ai"
                          labelIcon={<MessageCircleCodeIcon size={15} />}
                          href="/chat-ai"></UserButton.Link>

                        <UserButton.Link
                          label="Help Desk"
                          labelIcon={<HelpCircleIcon size={15} />}
                          href="helpdesk"></UserButton.Link>
                      </UserButton.MenuItems>
                    </UserButton>
                  </SignedIn>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          openMenu ? "w-3/4" : "w-0"
        } fixed top-0 right-0 h-full bg-black transition-all overflow-hidden z-50`}>
        <div className="flex justify-end px-4 py-5">
          <RxCross1
            onClick={handleCloseMenu}
            className="text-white text-4xl cursor-pointer"
          />
        </div>
        <ul className="text-white font-semibold p-4 space-y-4">
          <li>
            {/* Show Sign-in button when signed out */}
            <SignedOut>
              <Button
                onClick={() => setShowSignIn(true)}
                variant="secondary"
                className="rounded-full w-full">
                Sign-in
              </Button>
            </SignedOut>

            {/* Show UserButton when signed in */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: " w-10 h-10",
                  },
                }}
                className="mr-3">
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Purchases"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="my-applications"></UserButton.Link>

                  <UserButton.Link
                    label="Payment History"
                    labelIcon={<FaCashRegister size={15} />}
                    href="saved-jobs"></UserButton.Link>

                  <UserButton.Link
                    label="Chat with Ai"
                    labelIcon={<MessageCircleCodeIcon size={15} />}
                    href="saved-jobs"></UserButton.Link>

                  <UserButton.Link
                    label="Help Desk"
                    labelIcon={<HelpCircleIcon size={15} />}
                    href="helpdesk"></UserButton.Link>
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/all-courses">All Courses</Link>
          </li>
          <li>
            <Link href="/live_class">Live Classes</Link>
          </li>
          <li
            className="duration-150 hover:border-transparent p-1 cursor-pointer"
            onClick={handleSupportModalOpen} // Open support modal on click
          >
            Support
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop:blur-3xl"
          onClick={handleOverlayOut}>
          <SignIn
            routing="hash"
            signUpForceRedirectUrl="/"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
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
    </nav>
  );
};

export default Navbar;
