import React from "react";
import reviews from "/src/lib/reviews.json";
import ReviewsCard from "./ReviewsCard";

const firstcolum = reviews.slice(0, 3);
const secondColum = reviews.slice(3, 6);
const lastColum = reviews.slice(6, 9);

const Reviews = () => {
  return (
    <section className="container mx-auto my-7">
      <div className="m-5">
        <p className="text-2xl text-center font-semibold text-primary">
          Reviews
        </p>
        <h1 className="md:text-4xl text-3xl text-center font-bold my-2">
          What Our Learners Say
        </h1>
        <p className="text-center md:w-[55%] flex mx-auto text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo mollitia
          perspiciatis magnam, nostrum nesciunt, tempore ut sit,
        </p>
      </div>
      {/* all cards */}
      <div className="md:flex gap-5">
        <div className="flex flex-col w-full gap-6 mask-gradient">
          {firstcolum.map((first, index) => (
            <ReviewsCard key={index} first={first} />
          ))}
        </div>
        <div className="flex-col w-full gap-6 mask-gradient hidden md:inline-flex">
          {secondColum.map((first, index) => (
            <ReviewsCard key={index} first={first} />
          ))}
        </div>
        <div className="flex-col w-full gap-6 mask-gradient hidden md:inline-flex">
          {lastColum.map((first, index) => (
            <ReviewsCard key={index} first={first} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
