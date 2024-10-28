"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesContent from "./CoursesContent";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/shared/Loader";

function MyLearning() {
  const { user } = useUser()
  // console.log("user", user);
  
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
          <p className="text-2xl p-4">Coming soon this feature!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyLearning;