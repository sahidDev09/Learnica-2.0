import Banner from "@/components/homePage/Banner";
import Categories from "@/components/homePage/Categories";
import Companies from "@/components/homePage/Companies";
import LatestCourses from "@/components/homePage/LatestCourse";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Web Warriors</h1>

      {/* navbar */}

      {/* Hero banner */}
      <Banner></Banner>
      {/* companies */}
      <Companies />
      {/* categories */}
      <Categories />

      {/* leatest course */}
      <LatestCourses />

      {/* footer */}
    </div>
  );
};

export default HomePage;
