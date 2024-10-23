"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import Concepts from "./Concepts";
import CourseInfo from "./CourseInfo";
import AdditionalSettings from "./AdditonalSettings";

const NewCourse = () => {
  const courseInfoInitialData = {
    title: "",
    category: "",
    subtitle: "",
    description: "",
    pricing: "",
    objectives: "",
    image: "",
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

  console.log(additionalInfo, "Bangladesh 2.0");
  console.log(lecture, "Inda magir pua");

  return (
    <div className=" container mx-auto py-4">
      <div className=" flex items-center justify-between">
        <h1 className="md:text-3xl text-xl font-extrabold">
          Add a new courses
        </h1>
        <Button className="bg-secondary">SUBMIT</Button>
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
