import Banner from "@/components/homePage/Banner";
import Categories from "@/components/homePage/Categories";
import Companies from "@/components/homePage/Companies";
import Faq from "@/components/homePage/Faq";
import LatestCourses from "@/components/homePage/LatestCourse";

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
      {/* faq */}
      <Faq />
    </div>
  );
};

export default HomePage;
