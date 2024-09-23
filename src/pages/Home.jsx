import Banner from "@/components/homePage/Banner";
import Categories from "@/components/homePage/Categories";
import CertificateSection from "@/components/homePage/CertificatesSection/CertificateSection";
import Companies from "@/components/homePage/Companies";
import Faq from "@/components/homePage/Faq";
import LatestCourses from "@/components/homePage/LatestCourse";
import Promotional from "@/components/homePage/Promotional";
import Reviews from "@/components/homePage/Reviews";

import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* navbar */}

      {/* Hero banner */}
      <Banner></Banner>
      {/* companies */}
      <Companies />
      {/* categories */}
      <Categories />
      {/* leatest course */}
      <LatestCourses />
      {/* certificates */}
      <CertificateSection></CertificateSection>
      {/* Reviews */}

      <Reviews />

      {/* promotional */}

      <Promotional />

      {/* faq */}
      {/* <Faq /> */}
    </div>
  );
};

export default HomePage;
