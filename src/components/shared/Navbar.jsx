"use client";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useState, useEffect } from "react";
import DarkModeLogo from "../../../public/assets/learnicaNavlogo.png";

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
  BellDot,
  BriefcaseBusiness,
  FileStackIcon,
  PenBox,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCashRegister } from "react-icons/fa";
import Support from "../Support";
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
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

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
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/user?email=${currUser}`
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

  if (loading) {
    return (
      <div className=" bg-secondary w-full text-center text-white">
        please wait..
      </div>
    );
  }

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
                  className="duration-150 hover:border-transparent text-center p-1">
                  <li>Home</li>
                </Link>

                <Link
                  href="/all-courses"
                  className="duration-150 hover:border-transparent p-1 text-center">
                  <li>Courses</li>
                </Link>

                {user && (
                  <>
                    <Link
                      href="/live_class"
                      className="duration-150 hover:border-transparent p-1 text-center">
                      <li>Live classes</li>
                    </Link>
                    <li
                      className="duration-150 hover:border-transparent p-1 text-center cursor-pointer"
                      onClick={() => setShowSupportModal(true)}>
                      Helpline
                    </li>
                  </>
                )}

                <Link
                  href="/about"
                  className="duration-150 hover:border-transparent p-1 text-center">
                  <li>About Us</li>
                </Link>

                {/* <li className="p-1">
                  <BellDot />
                </li> */}
                {user && (
                  <li>
                    <Sheet>
                      <SheetTrigger>
                        <Image
                          src={"/assets/aibot 2.jpeg"}
                          alt=""
                          width={35}
                          height={100}
                          className=" rounded-full"
                        />
                      </SheetTrigger>
                      <SheetContent className="w-[510px] sm:max-w-none">
                        <SheetHeader>
                          <SheetTitle>
                            Here is some suggestions for you
                          </SheetTitle>
                          <SheetDescription>
                            <Chat />
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </li>
                )}
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
                        className="rounded-full bg-primary"
                        aria-label="Author Dashboard">
                        <ShieldCheck size={20} /> Admin mode
                      </Button>
                    </Link>
                  ) : user?.unsafeMetadata?.role === "teacher" ? (
                    <Link href="/dashboard/teacher">
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
                          avatarBox: " w-10 h-10",
                        },
                      }}>
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="My Learning"
                          labelIcon={<BriefcaseBusiness size={15} />}
                          href="my-learning"></UserButton.Link>

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
              <Link href="/dashboard/admin/manage-courses">
                <Button
                  variant="destructive"
                  className="rounded-full"
                  aria-label="Author Dashboard">
                  <ShieldCheck size={20} /> Admin
                </Button>
              </Link>
            ) : user?.unsafeMetadata?.role === "teacher" ? (
              <Link href="/dashboard/teacher">
                <Button
                  variant="destructive"
                  className="rounded-full"
                  aria-label="Author Dashboard">
                  <ShieldCheck size={20} /> Teacher
                </Button>
              </Link>
            ) : null}
          </li>
          <li>
            <Sheet>
              <SheetTrigger className="flex items-center gap-4">
                <h1>Learnica AI</h1>
                <Image
                  src={"/assets/aibot 2.jpeg"}
                  alt=""
                  width={25}
                  height={100}
                  className=" rounded-full"
                />
              </SheetTrigger>
              <SheetContent className="md:w-[510px] w-screen">
                <SheetHeader>
                  <SheetTitle>Here is some suggestions for you</SheetTitle>
                  <SheetDescription>
                    <Chat />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/all-courses">Courses</Link>
          </li>
          <li>
            <Link href="/live_class">Live Classes</Link>
          </li>
          <li
            className="duration-150 hover:border-transparent p-1 cursor-pointer"
            onClick={() => setShowSupportModal(true)}>
            Helpline
          </li>
          <li>
            <Link href="/about">About Us</Link>
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

      <Support
        user={user}
        showSupportModal={showSupportModal}
        setShowSupportModal={setShowSupportModal}
        className="overflow-y-auto max-h-screen"></Support>
    </nav>
  );
};

export default Navbar;
