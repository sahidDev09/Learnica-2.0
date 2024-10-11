"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter
import Banner from "@/components/homePage/Banner";
import Categories from "@/components/homePage/Categories";
import CertificateSection from "@/components/homePage/CertificatesSection/CertificateSection";
import Companies from "@/components/homePage/Companies";
import LatestCourses from "@/components/homePage/LatestCourse";
import Promotional from "@/components/homePage/Promotional";
import Reviews from "@/components/homePage/Reviews";
import Loading from "@/app/loading";

const HomePage = () => {
  // const [loading, setLoading] = useState(true);
  // const { user } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   const checkUserRole = async () => {
  //     if (user && !user?.unsafeMetadata?.role) {
  //       router.push("/onboarding");
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   checkUserRole();
  // }, [user, router]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div>
      {/* Hero banner */}
      <Banner />
      {/* Companies */}
      <Companies />
      {/* Categories */}
      <Categories />
      {/* Latest courses */}
      <LatestCourses />
      {/* Certificates */}
      <CertificateSection />
      {/* Reviews */}
      <Reviews />
      {/* Promotional section */}
      <Promotional />
    </div>
  );
};

export default HomePage;
