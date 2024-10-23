/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import Concepts from "./Concepts";
import CourseInfo from "./CourseInfo";
import AdditionalSettings from "./AdditonalSettings";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";

const NewCourse = () => {
  const { user, isLoaded } = useUser();

  const courseInfoInitialData = {
    title: "",
    category: "",
    subtitle: "",
    description: "",
    pricing: "",
    objectives: "",
    status: "pending",
    authorId: user?.id || "",
    authorEmail: user?.primaryEmailAddress?.emailAddress || "",
    authorName: user?.fullName || "",
    authorProfile: user?.imageUrl || "",
    publish_date: Date.now(),
  };

  const initialLecture = {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  };

  const initialAdditional = {
    image: "",
    coupon_code: "",
    discount_amount: "",
  };

  const [lecture, setLecture] = useState([initialLecture]);
  const [courseInfo, setCourseInfo] = useState(courseInfoInitialData);
  const [additionalInfo, setAdditionalInfo] = useState([initialAdditional]);

  useEffect(() => {
    if (isLoaded && user) {
      setCourseInfo((prevInfo) => ({
        ...prevInfo,
        authorId: user.id,
        authorEmail: user.primaryEmailAddress?.emailAddress,
        authorName: user.fullName,
        authorProfile: user.imageUrl,
      }));
    }
  }, [isLoaded, user]);

  const handleSubmit = async () => {
    const courseInfoData = {
      name: courseInfo.title,
      category: courseInfo.category,
      subtitle: courseInfo.subtitle,
      description: courseInfo.description,
      pricing: courseInfo.pricing,
      objectives: courseInfo.objectives,
      status: courseInfo.status,
      author: {
        id: courseInfo.authorId,
        name: courseInfo.authorName,
        email: courseInfo.authorEmail,
        profile: courseInfo.authorProfile,
      },
      publish_date: courseInfo.publish_date,

      lectures: lecture.map((lec) => ({
        title: lec.title,
        videoUrl: lec.videoUrl,
        freePreview: lec.freePreview,
        public_id: lec.public_id,
      })),
      additionalInfo: {
        image: additionalInfo.image,
        coupon_code: additionalInfo.coupon_code,
        discount_amount: additionalInfo.discount_amount,
      },
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/add-course",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(courseInfoData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Successfully added the course!",
          icon: "success",
          confirmButtonColor: "#15803D",
        });
      } else {
        throw new Error(data.message || "Failed to add course.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error on adding course!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };

  return (
    <div className=" container mx-auto py-4">
      <div className=" flex items-center justify-between">
        <h1 className="md:text-3xl text-xl font-extrabold">
          Add a new courses
        </h1>
        <Button className="bg-secondary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </div>
      <Card className="my-4">
        <CardContent>
          <div className=" container mx-auto py-4">
            <Tabs defaultValue="concepts" className=" space-y-4 rounded-md">
              <TabsList className=" rounded-md bg-secondary text-white">
                <TabsTrigger value="concepts">Concepts</TabsTrigger>
                <TabsTrigger value="course-info">Course Info</TabsTrigger>
                <TabsTrigger value="additional-settings">
                  Additional info
                </TabsTrigger>
              </TabsList>
              <TabsContent value="concepts">
                <Concepts lecture={lecture} setLecture={setLecture} />
              </TabsContent>
              <TabsContent value="course-info">
                <CourseInfo
                  courseInfo={courseInfo}
                  setCourseInfo={setCourseInfo}
                />
              </TabsContent>
              <TabsContent value="additional-settings">
                <AdditionalSettings
                  additionalInfo={additionalInfo}
                  setAdditionalInfo={setAdditionalInfo}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCourse;
