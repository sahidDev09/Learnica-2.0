import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl } from "@/components/ui/form";
import { AuthorContext } from "@/context/Author-context";
import React, { useContext } from "react";

const CourseInfo = () => {
  const { courseInfoFormdata, setCourseInfoFormdata } =
    useContext(AuthorContext);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FormControl
            formControls={courseinformationFormControls}
            formData={courseInfoFormdata}
            setFormData={setCourseInfoFormdata}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseInfo;
