"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

const Concepts = ({ lecture, setLecture }) => {
  const handleAddLecture = () => {
    setLecture((prevLecture) => [
      ...prevLecture,
      { title: "", videoUrl: "", freePreview: false, public_id: "" },
    ]);
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

  const handleVideoUploadSuccess = (info, index) => {
    const updatedLectures = lecture.map((lec, i) =>
      i === index
        ? {
            ...lec,
            videoUrl: info.secure_url,
            public_id: info.public_id,
            title: info.original_filename || lec.title,
          }
        : lec
    );
    setLecture(updatedLectures);
  };

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
                <CldUploadWidget
                  uploadPreset="ml_default"
                  onSuccess={({ event, info }) => {
                    if (event === "success") {
                      handleVideoUploadSuccess(info, index);
                    }
                  }}>
                  {({ open }) => (
                    <div className="flex items-center gap-3 border rounded-md mt-4">
                      {lec.videoUrl ? (
                        <Button
                          className="bg-primary text-white"
                          onClick={() => open()}>
                          Replace video file
                        </Button>
                      ) : (
                        <Button variant="secondary" onClick={() => open()}>
                          Upload video file
                        </Button>
                      )}
                      {lec.videoUrl ? (
                        <a>{lec.title}</a>
                      ) : (
                        <h1>No chosen file yet</h1>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Concepts;
