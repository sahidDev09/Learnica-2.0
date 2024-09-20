import Banner from "@/components/homePage/Banner";
import Categories from "@/components/homePage/Categories";
// import Companies from "@/components/homePage/Companies";
import LatestCourses from "@/components/homePage/LatestCourse";

import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* navbar */}

      {/* Hero banner */}
      <Banner></Banner>
      {/* companies */}
      {/* <Companies /> */}
      {/* categories */}
      <Categories />
      {/* leatest course */}
      <LatestCourses />
    </div>
  );
};

export default HomePage;
