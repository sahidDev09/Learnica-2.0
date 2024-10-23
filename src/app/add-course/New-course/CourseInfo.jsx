"use client";
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

const CourseInfo = ({ courseInfo, setCourseInfo }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCourseInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* title */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="title">Course Title</Label>
              <Input
                type="text"
                id="title"
                value={courseInfo.title}
                onChange={handleInputChange}
                placeholder="Enter your course title"
              />
            </div>

            {/* category */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="category">Category</Label>
              <Select
                value={courseInfo.category}
                onValueChange={(value) =>
                  setCourseInfo((prevState) => ({
                    ...prevState,
                    category: value,
                  }))
                }>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dropdown-open-down">
                  {category.map((cat, index) => (
                    <SelectItem key={index} value={cat.label}>
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
                value={courseInfo.subtitle}
                onChange={handleInputChange}
                placeholder="Enter your course sub-title"
              />
            </div>

            {/* description */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={courseInfo.description}
                onChange={handleInputChange}
                placeholder="Course Description"
              />
            </div>

            {/* pricing */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="pricing">Course Price</Label>
              <Input
                type="number"
                id="pricing"
                value={courseInfo.pricing}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </div>

            {/* Course Objectives */}
            <div className="flex flex-col space-y-2.5">
              <Label htmlFor="objectives">Course Objective</Label>
              <Textarea
                id="objectives"
                value={courseInfo.objectives}
                onChange={handleInputChange}
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
