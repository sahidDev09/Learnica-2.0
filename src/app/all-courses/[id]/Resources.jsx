"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Delete, DownloadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";

const Resources = ({ courseId, userid }) => {
  const [loading, setLoading] = useState(false);
  const [attachmentData, setAttachmentData] = useState({
    name: "",
    url: "",
  });

  const { user } = useUser();

  // Post data to MongoDB
  const addResources = async (resData) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/add-resources",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload resource");
      }

      const data = await res.json();
      return data; // Return the data to confirm success
    } catch (error) {
      throw new Error("Error uploading data: " + error.message);
    }
  };

  // Fetch all resources
  const {
    data: resources = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["resources", courseId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/resources?courseId=${courseId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch resources");
      }
      return res.json();
    },
  });

  // Handle file upload and sending data to MongoDB
  const handleUpload = async () => {
    setLoading(true);
    try {
      const resData = {
        file_name: attachmentData.name,
        url: attachmentData.url,
        courseId: courseId,
      };

      // Call addResources and check response
      const result = await addResources(resData);

      if (result) {
        Swal.fire({
          title: "Uploaded successfully!",
          text: "Your selected resource uploaded",
          icon: "success",
        });
        setAttachmentData({
          name: "",
          url: "",
        });
        await refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `<a>${error.message}</a>`,
      });
    } finally {
      setLoading(false);
    }
  };

  //delete resources

  const handleResDelete = async (resourceId) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#15803D",
        cancelButtonColor: "#B91C1C",
        confirmButtonText: "Yes, delete it!",
      });
      if (!isConfirmed) return;

      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/resources",
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ resourceId }),
        }
      );
      await res.json();
      Swal.fire({
        title: "Successfully deleted the resources!",
        icon: "success",
        confirmButtonColor: "#15803D",
      });
      // refetch notes
      await refetch();
    } catch (error) {
      Swal.fire({
        title: "Error on deleting recources!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-card p-4 overflow-hidden rounded-md flex flex-col gap-3 items-start">
      {user?.id === userid && (
        <div className="flex flex-col gap-3">
          <h1>Upload New Attachments</h1>
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={({ event, info }) => {
              if (event === "success") {
                setAttachmentData({
                  name: info.display_name,
                  url: info.url,
                });
              }
            }}>
            {({ open }) => (
              <Button variant="outline" onClick={() => open()}>
                Add Attachment
              </Button>
            )}
          </CldUploadWidget>

          {attachmentData.name && (
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-secondary">
                Selected Attachment
              </h3>
              <p>{attachmentData.name}</p>
              <Button className="bg-secondary" onClick={handleUpload}>
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Resource card */}
      {resources.length > 0 ? (
        resources.map((resource) => (
          <div
            className="border rounded-md shadow-md w-full bg-white"
            key={resource._id}>
            <div className="bg-white p-4 items-center rounded-md md:flex gap-2 justify-between">
              <Image
                src={"/assets/fileAttached.webp"}
                alt="file-attachment"
                className="object-fill p-2 bg-secondary rounded-md"
                width={65}
                height={65}
              />
              <div>
                <h1 className="md:text-lg font-semibold text-secondary">
                  {resource.file_name.slice(0, 30)}...
                </h1>
                <p className="text-gray-400 text-sm hidden md:inline-block">
                  You can download this resource for offline reading.
                </p>
              </div>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  className="flex gap-1 items-center bg-secondary text-white">
                  <DownloadCloudIcon />{" "}
                  <span className="hidden md:inline-block">Download</span>
                </Button>
              </a>
              {user?.id === userid && (
                <Button
                  onClick={() => handleResDelete(resource._id)}
                  className="bg-red-400">
                  <Delete />
                </Button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center mx-auto">
          <Image
            src={"/assets/noData.png"}
            className="flex mx-auto"
            alt="nodata"
            width={100}
            height={100}
          />
          <p>No resources currently available.</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
