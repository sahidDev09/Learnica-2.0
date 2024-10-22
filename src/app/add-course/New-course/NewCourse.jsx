import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import Concepts from "./Concepts";
import CourseInfo from "./CourseInfo";
import AdditonalSettings from "./AdditonalSettings";

const NewCourse = () => {
  return (
    <div className=" container mx-auto py-4">
      <div className=" flex items-center justify-between">
        <h1 className=" text-3xl font-extrabold">Add a new courses</h1>
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
                  Additional Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="concepts">
                <Concepts />
              </TabsContent>
              <TabsContent value="course-info">
                <CourseInfo />
              </TabsContent>
              <TabsContent value="additional-settings">
                <AdditonalSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCourse;
