import Image from "next/image";
import React from "react";

const ReviewsCard = ({ first }) => {
  return (
    <div>
      <div className="card bg-card shadow-md border">
        <div className="card-body">
          <p className=" text-sm">{first.review_text}</p>

          <div className="flex items-center gap-3 my-6">
            <div className="h-10 w-10 rounded-full overflow-hidden p-1 border border-blue-200">
              <Image
                width={100}
                height={100}
                className=" object-cover w-full h-full rounded-full"
                src={first.userImage}
                alt="iamge"></Image>
            </div>
            <div>
              <h1 className=" font-semibold">{first.name}</h1>
              <p className=" font-semibold text-sm text-gray-500">
                @{first.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
