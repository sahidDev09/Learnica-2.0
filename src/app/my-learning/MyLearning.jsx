import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MyLearning() {
  return (
    <div>
      <Tabs defaultValue="courses">
        <TabsList className="bg-secondary text-white">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="custom-courses">My Custom Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">Courses content</TabsContent>
        <TabsContent value="custom-courses">Custom courses content</TabsContent>
      </Tabs>
    </div>
  );
}

export default MyLearning;