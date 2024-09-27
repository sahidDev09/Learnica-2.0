// /components/Courses.js
"use client";

import React from "react";
import Card from "@/components/shared/Card";
import Loading from "../loading";
import NoDataFound from "../noDataFound";

const Courses = ({ products, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return <NoDataFound />;
  }

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((course) => (
            <Card key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
