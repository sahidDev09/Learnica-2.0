import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";

const AdditionalSettings = ({ additionalInfo, setAdditionalInfo }) => {
  const handleCouponChange = (e) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      coupon_code: e.target.value,
    }));
  };

  const handleDiscountChange = (e) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      discount_amount: e.target.value,
    }));
  };

  const handleImageUrlChange = (e) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      image: e.target.value, 
    }));
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
                  placeholder="Enter Coupon code"
                  value={additionalInfo.coupon_code} // bind to parent state
                  onChange={handleCouponChange} // update parent state
                />
              </div>

              {/* Coupon Discount */}
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="discount">Coupon Discount</Label>
                <Input
                  type="number"
                  id="discount"
                  placeholder="Enter discount amount"
                  value={additionalInfo.discount_amount} // bind to parent state
                  onChange={handleDiscountChange} // update parent state
                />
              </div>
            </div>

            {/* Upload Course Image */}
            <div className="flex flex-col space-y-2.5">
              <Label>Upload Course Thumbnail</Label>
              <CldUploadWidget
                uploadPreset="ml_default"
                onSuccess={({ info }) => {
                  setAdditionalInfo((prev) => ({
                    ...prev,
                    image: info.secure_url, // update parent state with the uploaded image
                  }));
                }}>
                {({ open }) => (
                  <div className="border rounded-md mt-4 flex flex-col gap-4 items-start">
                    <Button variant="secondary" onClick={() => open()}>
                      {additionalInfo.image ? "Replace Image" : "Upload Image"}
                    </Button>
                    {additionalInfo.image ? (
                      <Image
                        src={additionalInfo.image}
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

            {/* Image URL Input */}
            <div className="flex flex-col space-y-2.5 disabled:true">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                type="text"
                id="image-url"
                placeholder="Enter Image URL"
                value={additionalInfo.image}
                disabled
                onChange={handleImageUrlChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalSettings;
