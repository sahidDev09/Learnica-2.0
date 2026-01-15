"use client";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Button } from "../ui/button";

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
  PenBox,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCashRegister } from "react-icons/fa";
import HelplineContent from "../HelplineContent";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "../ui/expandable-screen";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Chat from "../Chat";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLiveClasses, setShowLiveClasses] = useState(false); 
  const [mainRole, setMainRole] = useState(null);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

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
            `/api/users/user?email=${currUser}`
          );
          const data = await response.json();
          const currData = data;
          setMainRole(currData.mainRole);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currUser]);

  useEffect(() => {
    // Fetch orders to determine if "Live classes" should be shown
    const fetchOrders = async () => {
      if (currUser) {
        try {
          const response = await fetch(
            `/api/get-orders?email=${currUser}`
          );
          const data = await response.json();
          // Check if email is found in the data
          const emailMatch = data.some((order) => order.email === currUser);
          setShowLiveClasses(emailMatch);
        } catch (error) {
          console.error("Error fetching orders data:", error);
        }
      }
    };

    fetchOrders();
  }, [currUser]);


  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="w-full container mx-auto text-slate-900">
        <div className="flex mx-auto justify-between items-center py-4 px-6 md:px-0">
          <Link href={"/"}>
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/navLogo.png"}
                alt="Logo"
                width={100}
                height={100}
                className="w-32"
              />
            </div>
          </Link>
          <div>
            {/* Mobile menu icon */}
            <div className="block lg:hidden">
              <IoMdMenu
                onClick={handleOpenMenu}
                className="text-4xl cursor-pointer"
              />
            </div>
            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <ul className="flex gap-6">
                <Link
                  href="/"
                  className="duration-150 text-slate-600 hover:text-primary font-semibold text-center p-1">
                  <li>Home</li>
                </Link>

                <Link
                  href="/all-courses"
                  className="duration-150 text-slate-600 hover:text-primary font-semibold p-1 text-center">
                  <li>Courses</li>
                </Link>

                {user && (
                  <>
                    {(showLiveClasses || user?.unsafeMetadata?.role === "teacher" || mainRole === "admin") && (
                  <Link href="/live_class" className="duration-150 text-slate-600 hover:text-primary font-semibold p-1 text-center">
                    <li>Live classes</li>
                  </Link>
                )}
                    <ExpandableScreen layoutId="helpline-desktop">
                      <li className="duration-150 text-slate-600 hover:text-primary font-semibold p-1 text-center cursor-pointer">
                        <ExpandableScreenTrigger>
                          Helpline
                        </ExpandableScreenTrigger>
                      </li>
                      <ExpandableScreenContent className="z-[100]">
                        <HelplineContent user={user} />
                      </ExpandableScreenContent>
                    </ExpandableScreen>
                  </>
                )}

                <Link
                  href="/about"
                  className="duration-150 text-slate-600 hover:text-primary font-semibold p-1 text-center">
                  <li>About Us</li>
                </Link>
                {user && (
                  <li>
                    <Sheet>
                      <SheetTrigger>
                        <Image
                          src={"/assets/aibot.png"}
                          alt="chatbotAi"
                          width={35}
                          height={35}
                          className=" rounded-full"
                        />
                      </SheetTrigger>
                      <SheetContent className="min-w-[500px] p-0 border-l border-red-500 dark:  border-zinc-800">
                        <div className="flex flex-col h-full">
                          <SheetHeader className="p-6 pb-0">
                            <SheetTitle className="text-xl font-bold tracking-tight">Learnica AI Assistant</SheetTitle>
                            <SheetDescription className="text-xs text-zinc-500">
                              Ask anything about our courses, platforms, or general learning tips.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="flex-grow mt-4 overflow-hidden border-t border-zinc-100 dark:border-zinc-900">
                            <Chat />
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </li>
                )}
                {/* Authentication Buttons */}
                <div className="flex gap-5">
                  <SignedOut>
                    <Button
                      onClick={() => setShowSignIn(true)}
                      className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105">
                      Sign-in
                    </Button>
                  </SignedOut>

                  {/* author dashboard */}

                  {user && (mainRole === "admin" || user?.unsafeMetadata?.role === "teacher") && (
                    <Button
                      onClick={() => {
                        const isAdmin = mainRole === "admin";
                        if (isAdmin) {
                          setIsDashboardModalOpen(true);
                        } else {
                          router.push("/dashboard/teacher");
                        }
                      }}
                      className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg shadow-primary/20 transition-all hover:rotate-2"
                      aria-label="Dashboard">
                      <ShieldCheck size={20} className="mr-2" /> Dashboard
                    </Button>
                  )}

                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10",
                        },
                      }}>
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="My Learning"
                          labelIcon={<BriefcaseBusiness size={15} />}
                          href="/my-learning"></UserButton.Link>

                        <UserButton.Link
                          label="Payment History"
                          labelIcon={<FaCashRegister size={15} />}
                          href="/payment-history"></UserButton.Link>

                        <UserButton.Link
                          label="Custom Course"
                          labelIcon={<FileStackIcon size={15} />}
                          href="/custom-course"></UserButton.Link>
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
        <div className="absolute right-4 top-4">
          <RxCross1
            onClick={handleCloseMenu}
            className="text-red-600 text-4xl cursor-pointer"
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
                    label="My Learning"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-learning"></UserButton.Link>

                  <UserButton.Link
                    label="Payment History"
                    labelIcon={<FaCashRegister size={15} />}
                    href="/payment-history"></UserButton.Link>

                  <UserButton.Link
                    label="Custom Course"
                    labelIcon={<FileStackIcon size={15} />}
                    href="/custom-course"></UserButton.Link>
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </li>
          <li>
            {/* author dashboard */}
            {user && (mainRole === "admin" || user?.unsafeMetadata?.role === "teacher") && (
              <Button
                variant="destructive"
                className="rounded-full w-full"
                onClick={() => {
                  const isAdmin = mainRole === "admin";
                  handleCloseMenu();
                  if (isAdmin) {
                    setIsDashboardModalOpen(true);
                  } else {
                    router.push("/dashboard/teacher");
                  }
                }}
                aria-label="Dashboard">
                <ShieldCheck size={20} className="mr-2" /> Dashboard
              </Button>
            )}
          </li>
          <li>
            <Sheet>
              <SheetTrigger className="flex items-center gap-4">
                <h1>Learnica AI</h1>
                <Image
                  src={"/assets/aibot.png"}
                  alt=""
                  width={25}
                  height={100}
                  className=" rounded-full"
                />
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-[400px] p-0 border-l border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 pb-2">
                    <SheetTitle className="text-lg font-bold">Learnica AI</SheetTitle>
                  </SheetHeader>
                  <div className="flex-grow overflow-hidden border-t border-zinc-100 dark:border-zinc-900">
                    <Chat />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </li>
          <li>
            <Link href="/" className="hover:font-bold">Home</Link>
          </li>
          <li>
            <Link href="/all-courses" className="hover:font-bold">Courses</Link>
          </li>
          <li className="">
          {(showLiveClasses || user?.unsafeMetadata?.role === "teacher" || mainRole === "admin") && (
                  <Link href="/live_class" className="hover:font-bold">
                    <li>Live classes</li>
                  </Link>
                )}
          </li>
          <ExpandableScreen layoutId="helpline-mobile">
            <li className="hover:font-bold">
              <ExpandableScreenTrigger>
                Helpline
              </ExpandableScreenTrigger>
            </li>
            <ExpandableScreenContent className="z-[100]">
              <HelplineContent user={user} />
            </ExpandableScreenContent>
          </ExpandableScreen>
          <li>
            <Link href="/about" className="hover:font-bold">About Us</Link>
          </li>
        </ul>
      </div>

      {/* support moadal */}


    </nav>

    {/* Sign In Modal - Rendered outside nav for full-screen coverage */}
    {showSignIn && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto"
        onClick={handleOverlayOut}>
        <SignIn
          routing="hash"
          signUpForceRedirectUrl="/"
          fallbackRedirectUrl="/onboarding"
        />
      </div>
    )}

    {/* Dashboard Selection Modal */}
    {isDashboardModalOpen && (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" 
          onClick={() => setIsDashboardModalOpen(false)} 
        />
        <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-white/20 transform transition-all duration-300 ease-out animate-in zoom-in-95 fade-in">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Welcome Back!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Where you wanna Enter please select</p>
          </div>
          
          <div className="grid gap-5">
            <button 
              onClick={() => {
                setIsDashboardModalOpen(false);
                router.push("/dashboard/admin");
              }}
              className="group relative flex items-center gap-5 p-5 rounded-[1.5rem] bg-primary hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95"
            >
              <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-6 transition-transform">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white uppercase tracking-widest text-xs opacity-80 mb-1">Enter as</p>
                <p className="text-lg font-extrabold text-white">Admin mode</p>
              </div>
            </button>

            <button 
              onClick={() => {
                setIsDashboardModalOpen(false);
                router.push("/dashboard/teacher");
              }}
              className="group relative flex items-center gap-5 p-5 rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div className="p-3 bg-white dark:bg-zinc-700 rounded-2xl shadow-sm group-hover:rotate-6 transition-transform">
                <PenBox className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div className="text-left">
                <p className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-xs mb-1">Enter as</p>
                <p className="text-lg font-extrabold text-zinc-900 dark:text-white">Instructor mode</p>
              </div>
            </button>
          </div>

          <button 
            onClick={() => setIsDashboardModalOpen(false)}
            className="mt-8 w-full py-2 text-sm font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
