import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";

const AdditionalSettings = ({ additionalInfo, setAdditionalInfo }) => {
  const [settings, setSettings] = useState({
    couponCode: "",
    discountAmount: "",
    thumbnailUrl: "",
  });

  // Handle input change and update parent state automatically
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSettings = { ...settings, [name]: value };
    setSettings(updatedSettings);
    setAdditionalInfo((prev) => [
      {
        image: updatedSettings.thumbnailUrl,
        coupon_code: updatedSettings.couponCode,
        discount_amount: updatedSettings.discountAmount,
      },
      ...prev,
    ]);
  };

  // Handle thumbnail upload and update parent state automatically
  const handleImageUploadSuccess = (info) => {
    const updatedSettings = { ...settings, thumbnailUrl: info.secure_url };
    setSettings(updatedSettings);
    setAdditionalInfo((prev) => [
      {
        image: updatedSettings.thumbnailUrl,
        coupon_code: updatedSettings.couponCode,
        discount_amount: updatedSettings.discountAmount,
      },
      ...prev,
    ]);
  };


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="md:grid grid-cols-2 gap-4 items-center">
              {/* Coupon Code */}
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="coupon">Coupon Code</Label>
                <Input
                  type="text"
                  id="coupon"
                  name="couponCode"
                  placeholder="Enter Coupon code"
                  value={settings.couponCode}
                  onChange={handleChange}
                />
              </div>

              {/* Coupon Discount */}
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="discount">Coupon Discount</Label>
                <Input
                  type="number"
                  id="discount"
                  name="discountAmount"
                  placeholder="Enter discount amount"
                  value={settings.discountAmount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Upload Course Image */}
            <div className="flex flex-col space-y-2.5">
              <Label>Upload Course Thumbnail</Label>
              <CldUploadWidget
                uploadPreset="ml_default"
                onSuccess={({ info }) => handleImageUploadSuccess(info)}>
                {({ open }) => (
                  <div className="border rounded-md mt-4 flex flex-col gap-4 items-start">
                    {settings.thumbnailUrl ? (
                      <Button
                        className="bg-primary text-white"
                        onClick={() => open()}>
                        Replace Image
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={() => open()}>
                        Upload Image
                      </Button>
                    )}
                    {settings.thumbnailUrl ? (
                      <Image
                        src={settings.thumbnailUrl}
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
