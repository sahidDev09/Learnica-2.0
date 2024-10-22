import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import category from "/src/lib/courseCategory.json";
import { Textarea } from "@/components/ui/textarea";

const CourseInfo = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-4">
            {/* title */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="title">Course Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter your course title"
              />
            </div>
            {/* category */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dropdown-open-down">
                  {category.map((cat, index) => (
                    <SelectItem key={index} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* subtitle */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="subtitle">Course Sub-Title</Label>
              <Input
                type="text"
                id="subtitle"
                placeholder="Enter your course sub-title"
              />
            </div>

            {/* description */}

            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                type="text"
                id="description"
                placeholder="Course Description"
              />
            </div>
            {/* pricing */}

            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="price">Course Price</Label>
              <Input type="number" id="price" placeholder="Price" />
            </div>
            {/* Course Objectives */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="objective">Course Objective</Label>
              <Textarea
                type="text"
                id="objective"
                placeholder="Course Objective"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseInfo;
