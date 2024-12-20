"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesContent from "./CoursesContent";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/shared/Loader";
import CustomCoursesContent from "./CustomCoursesContent";

function MyLearning() {
  const { user } = useUser()
  
  if (!user) { return <Loader/> }
  return (
    <div>
      <Tabs defaultValue="courses">
        <TabsList className="bg-secondary text-white">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="custom-courses">My Custom Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CoursesContent user={user} />
        </TabsContent>
        <TabsContent value="custom-courses">
          <CustomCoursesContent user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyLearning;