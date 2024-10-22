import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const AdditonalSettings = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-4">
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
                  placeholder="Enter discount ammount"
                />
              </div>
            </div>

            {/* upload course image */}
            <div className="flex flex-col space-y-2.5">
              <Label>Upload Course Thumbnil</Label>
              <Input
                type="file"
                accept="image/*"
                className="mb-4 text-secondary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditonalSettings;
