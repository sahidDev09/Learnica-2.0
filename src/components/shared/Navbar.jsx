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
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import {
  BookAIcon,
  BriefcaseBusiness,
  Heart,
  MessageCircleCodeIcon,
  PenBox,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCashRegister } from "react-icons/fa";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const search = useSearchParams();
  const router = useRouter();

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
      // Clear search params after closing modal
      router.replace("/", { scroll: false });
    }
  };

  return (
    <nav className="bg-secondary">
      <div className="sticky z-20 top-0 w-full container mx-auto text-white dark:bg-black">
        <div className="rounded-b-2xl flex mx-auto justify-between items-center py-2 md:py-5 px-3 md:px-0">
          <div>
            <Image
              src={DarkModeLogo}
              alt="Logo"
              width={100}
              height={100}
              className="w-40"
            />
          </div>
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
                  <Link href="">
                    <Button variant="destructive" className="rounded-full">
                      <PenBox size={20} className="mr-2" /> Author Dashboard
                    </Button>
                  </Link>
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
                          href="saved-jobs"></UserButton.Link>

                        <UserButton.Link
                          label="Chat with Ai"
                          labelIcon={<MessageCircleCodeIcon size={15} />}
                          href="saved-jobs"></UserButton.Link>
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
          openMenu ? "w-1/2 md:w-1/4" : "w-0"
        } fixed duration-200 h-full top-0 z-20 left-0 bg-[#3B8BFF]`}>
        <div className="w-full flex justify-end">
          <RxCross1
            onClick={handleCloseMenu}
            className="text-right text-2xl mr-5 mt-5 text-white cursor-pointer"
          />
        </div>
        <div
          className={`${!openMenu ? "hidden" : "block"} flex justify-center`}>
          <ul className="flex flex-col text-center gap-5 text-white">
            <Link href="/" className="cursor-pointer">
              Home
            </Link>
            <Link href="/all-courses" className="cursor-pointer">
             All Courses
            </Link>
            <Link href="/about" className="cursor-pointer">
              About Us
            </Link>
            <li className="cursor-pointer">Sign In</li>
          </ul>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop:blur-3xl"
          onClick={handleOverlayOut}>
          <SignIn
            routing="hash"
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
