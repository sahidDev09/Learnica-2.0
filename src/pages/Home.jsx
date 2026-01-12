"use client";
import Banner from "@/components/homePage/Banner";
import Categories from "@/components/homePage/Categories";
import CertificateSection from "@/components/homePage/CertificatesSection/CertificateSection";
import Companies from "@/components/homePage/Companies";
import LatestCourses from "@/components/homePage/LatestCourse";
import Promotional from "@/components/homePage/Promotional";
import Reviews from "@/components/homePage/Reviews";
import MoveToTop from "@/components/homePage/MoveToTop";


const HomePage = () => {
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
      {/* move to top button */}
      <MoveToTop />
    </div>
  );
};

export default HomePage;
