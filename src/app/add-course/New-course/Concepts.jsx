"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const Concepts = () => {
  const initialLecture = {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  };

  const [lecture, setLecture] = useState([initialLecture]);

  const handleAddLecture = () => {
    setLecture((prevLecture) => [...prevLecture, { ...initialLecture }]);
  };

  const handleTitleChange = (event, index) => {
    const updatedLectures = lecture.map((lec, i) =>
      i === index ? { ...lec, title: event.target.value } : lec
    );
    setLecture(updatedLectures);
  };

  const handleFreePreviewChange = (index) => {
    const updatedLectures = lecture.map((lec, i) =>
      i === index ? { ...lec, freePreview: !lec.freePreview } : lec
    );
    setLecture(updatedLectures);
  };

  console.log(lecture, "my lecture class");

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Course Lectures ({lecture.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleAddLecture}
            className=" bg-secondary text-white">
            Add Lecture
          </Button>
          <div className=" my-2">
            {lecture.map((lec, index) => (
              <div key={index} className="border p-5 my-2 rounded-md">
                <div className="flex gap-5 items-center">
                  <h3 className=" font-semibold">Lecture {index + 1}</h3>
                  <Input
                    name={`title${index + 1}`}
                    placeholder="Write course title"
                    value={lec.title}
                    className="max-w-96"
                    onChange={(event) => handleTitleChange(event, index)}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={lec.freePreview}
                      onCheckedChange={() => handleFreePreviewChange(index)}
                      id={`freePreview${index + 1}`}
                    />
                    <Label htmlFor={`freePreview${index + 1}`}>
                      Free Preview
                    </Label>
                  </div>
                </div>
                <div className="mt-5">
                  <Input type="file" accept="video/*" className=" mb-4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Concepts;
