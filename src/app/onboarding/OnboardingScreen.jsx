"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const OnboardingScreen = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true); // Control for overlay visibility

  const handleRoleSelection = async (role) => {
    if (!user) return;

    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        router.push(role === "student" ? "/" : "/");
      })
      .catch((err) => {
        console.log("Error updating role", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      router.push(user.unsafeMetadata.role === "student" ? "/" : "/");
    }
  }, [router, user]);

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      setShowOverlay(false);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#ED626A" />;
  }

  if (showOverlay) {
    return (
      <div className="fixed inset-0 bg-secondary z-50 flex items-center justify-center">
        <div className="container mx-auto p-4 sm:p-0">
          <div className="flex flex-col items-center justify-center md:pt-28 pt-14">
            <h2 className="font-black text-6xl sm:text-8xl text-white">
              I am a..
            </h2>
            <p className="sm:text-md text-gray-300 text-center">
              Please select your role for control of your administration
            </p>
            <div className="mt-14 grid sm:grid-cols-2 gap-4 w-full md:px-40">
              <Button
                onClick={() => {
                  handleRoleSelection("student");
                  setShowOverlay(false);
                }}
                className="h-32 text-2xl">
                Student
              </Button>
              <Button
                onClick={() => {
                  handleRoleSelection("teacher");
                  setShowOverlay(false);
                }}
                variant="destructive"
                className="h-32 text-2xl">
                Teacher
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // Avoid rendering anything until role is selected
};

export default OnboardingScreen;
