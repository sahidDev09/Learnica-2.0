"use client";
import React from "react";
import reviews from "/src/lib/reviews.json";
import ReviewsCard from "./ReviewsCard";
import { motion } from "framer-motion";

const firstcolum = reviews.slice(0, 3);
const secondColum = reviews.slice(3, 6);
const lastColum = reviews.slice(6, 9);

const Reviews = () => {
  const duration = 0;
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

      <div className=" overflow-hidden mask-gradient md:flex gap-5 max-h-[738px]">
        {/* first col */}
        <motion.div
          animate={{
            translateY: "-50%",
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          className=" w-full flex flex-col gap-5">
          <div className="flex flex-col w-full gap-5" duration={15}>
            {firstcolum.map((first, idx) => (
              <ReviewsCard key={idx} first={first} />
            ))}
          </div>
          <div className="flex flex-col w-full gap-5" duration={15}>
            {firstcolum.map((first, idx) => (
              <ReviewsCard key={idx} first={first} />
            ))}
          </div>
        </motion.div>
        {/* second col */}
        <motion.div
          animate={{
            translateY: "-50%",
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          className=" w-full flex flex-col gap-5">
          <div className="flex flex-col w-full gap-5" duration={15}>
            {secondColum.map((first, idx) => (
              <ReviewsCard key={idx} first={first} />
            ))}
          </div>
          <div className="flex flex-col w-full gap-5" duration={15}>
            {secondColum.map((first, idx) => (
              <ReviewsCard key={idx} first={first} />
            ))}
          </div>
        </motion.div>
        {/* last col */}
        <motion.div
          animate={{
            translateY: "-50%",
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          className=" w-full flex flex-col gap-5">
          <div className="flex flex-col w-full gap-5" duration={15}>
            {lastColum.map((first, idx) => (
              <ReviewsCard key={idx} first={first} />
            ))}
          </div>
          <div className="flex flex-col w-full gap-5" duration={15}>
            {lastColum.map((first, idx) => (
              <ReviewsCard key={idx} first={first} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;