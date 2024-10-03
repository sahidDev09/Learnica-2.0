"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const OnboardingScreen = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        router.push(role === "student" ? "/" : "all-courses");
      })
      .catch((err) => {
        console.log("Error updating role", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      router.push(
        user?.unsafeMetadata?.role === "student" ? "/" : "all-courses"
      );
    }
  }, [router, user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#ED626A" />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-0">
      <div className="flex flex-col items-center justify-center md:pt-32 pt-14">
        <h2 className=" font-black text-6xl sm:text-8xl text-white">
          I am a..
        </h2>
        <p className=" sm:text-md text-gray-300 text-center">
          Please select your role for control your administration
        </p>
        <div className="mt-14 grid sm:grid-cols-2 gap-4 w-full md:px-40">
          <Button
            onClick={() => handleRoleSelection("student")}
            className=" h-32 text-2xl">
            Student
          </Button>
          <Button
            onClick={() => handleRoleSelection("teacher")}
            variant="destructive"
            className=" h-32 text-2xl">
            Teacher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
