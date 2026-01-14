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

                  {user && mainRole === "admin" ? (
                    <Link href="/dashboard/admin/statistics">
                      <Button
                        className="rounded-full bg-primary"
                        aria-label="Author Dashboard">
                        <ShieldCheck size={20} /> Admin mode
                      </Button>
                    </Link>
                  ) : user?.unsafeMetadata?.role === "teacher" ? (
                    <Link href="/dashboard/teacher/statistics">
                      <Button
                        className="rounded-full bg-primary"
                        aria-label="Author Dashboard">
                        <ShieldCheck size={20} /> instructor mode
                      </Button>
                    </Link>
                  ) : null}

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
            {user && mainRole === "admin" ? (
              <Link href="/dashboard/admin/statistics">
                <Button
                  variant="destructive"
                  className="rounded-full"
                  aria-label="Author Dashboard">
                  <ShieldCheck size={20} /> Admin Mode
                </Button>
              </Link>
            ) : user?.unsafeMetadata?.role === "teacher" ? (
              <Link href="/dashboard/teacher/statistics">
                <Button
                  variant="destructive"
                  className="rounded-full"
                  aria-label="Author Dashboard">
                  <ShieldCheck size={20} /> Instructor Mode
                </Button>
              </Link>
            ) : null}
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

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop:blur-3xl overflow-y-auto max-h-screen"
          onClick={handleOverlayOut}>
          <SignIn
            routing="hash"
            signUpForceRedirectUrl="/"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
      {/* support moadal */}


    </nav>
  );
};

export default Navbar;
