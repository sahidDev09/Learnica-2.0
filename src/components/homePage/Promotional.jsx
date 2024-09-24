"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

const Promotional = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className=" bg-gradient-to-b from-white to-blue-100 py-32">
      <div className="container mx-auto text-center p-5 md:p-0">
        <div className=" relative">
          <h1 className="md:text-5xl font-bold text-3xl my-5">
            Sign up for free today
          </h1>
          <p className="my-4 md:w-[40%] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            veniam numquam autem molestias unde maxime, pariatur et? Illo,
            commodi suscipit?
          </p>
          <motion.img
            src={"/assets/3dbook.webp"}
            alt="book"
            width={360}
            height={100}
            className="absolute -left-[100px] -top-[137px] hidden md:inline"
            style={{
              translateY,
            }}></motion.img>

          <motion.img
            src={"/assets/flexibility.png"}
            alt="book"
            width={260}
            height={100}
            className="absolute -right-[50px] -top-[-30px] hidden md:inline"
            style={{
              translateY,
            }}></motion.img>
        </div>
        <div className="flex items-center justify-center gap-5 ">
          <button className="btn bg-primary text-white">Get for free</button>
          <button className=" flex items-center gap-1">
            Learn more
            <span>
              <ArrowRight className="h-6 w-6 text-gray-600" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promotional;
