import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

const AdditionalSettings = () => {
  const [thumbnail, setThumbnail] = useState({
    url: "",
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="md:grid grid-cols-2 gap-4 items-center">
              {/* coupon code */}
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="coupon">Coupon Code</Label>
                <Input
                  type="text"
                  id="coupon"
                  placeholder="Enter Coupon code"
                />
              </div>

              {/* coupon discount */}
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="discount">Coupon Discount</Label>
                <Input
                  type="number"
                  id="discount"
                  placeholder="Enter discount amount"
                />
              </div>
            </div>

            {/* upload course image */}
            <div className="flex flex-col space-y-2.5">
              <Label>Upload Course Thumbnail</Label>
              <CldUploadWidget
                uploadPreset="ml_default"
                onSuccess={({ info }) => {
                  setThumbnail({
                    url: info.secure_url,
                  });
                }}>
                {({ open }) => (
                  <div className="border rounded-md mt-4 flex flex-col gap-4 items-start">
                    {thumbnail.url ? (
                      <Button className=" bg-primary text-white" onClick={() => open()}>
                        Replace Image
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={() => open()}>
                        Upload Image
                      </Button>
                    )}
                    {thumbnail.url ? (
                      // Display the uploaded image
                      <Image
                        src={thumbnail.url}
                        alt="Course Thumbnail"
                        width={500}
                        height={500}
                        className="rounded-md w-full h-full"
                      />
                    ) : (
                      <h1>No chosen Thumbnail yet</h1>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalSettings;
