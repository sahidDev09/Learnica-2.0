"use client"
import { useEffect, useState } from "react";
import Card from "@/components/shared/Card";
import Loading from "../loading";


const getCourses = async () => {
  const res = await fetch("http://localhost:3000/api/courses");
  const courses = await res.json();
  return courses;
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

  if (loading) {
    return <Loading />; 
  }

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course, index) => (
            <Card key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
