"use client";
import { useEffect, useState } from "react";
import Card from "@/components/shared/Card";
import Loading from "../loading";

const getCourses = async () => {
  try {
    const res = await fetch("/api/courses");

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    const courses = await res.json();
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

const Courses = ({ selectedCategory, searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const allCourses = await getCourses();
      let filteredCourses = allCourses;

      
      if (selectedCategory) {
        filteredCourses = filteredCourses.filter(
          (course) => course.category === selectedCategory
        );
      }

      // Filter by search query if available
      if (searchQuery) {
        filteredCourses = filteredCourses.filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setCourses(filteredCourses);
      setLoading(false);
    };

    fetchCourses();
  }, [selectedCategory, searchQuery]);

  // Show loading indicator while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Render courses or a message if no courses are available
  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course, index) => <Card key={index} course={course} />)
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
