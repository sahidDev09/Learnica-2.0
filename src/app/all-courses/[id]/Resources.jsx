"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Resources = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulate an upload process
      Swal.fire({
        title: "Hooray!",
        text: "File uploaded successfully!",
        icon: "success",
      });

      // You can add the actual upload logic here
      // For example: send the file to a backend server
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      <h1>Attachment & Resources</h1>
      <hr />
      <input type="file" onChange={handleFileChange} />
      <br />
      {selectedFile && (
        <div>
          <h3>Selected File:</h3>
          <p>{selectedFile.name}</p>
        </div>
      )}
      <Button className="" onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default Resources;
