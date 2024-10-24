"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import Swal from "sweetalert2";

const Promotional = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const handleSubmitNewsletter = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Hooray!",
      text: "You've successfully subscribed to our service. You'll receive an email soon.",
      icon: "success",
    });
  };

  return (
    <section
      ref={sectionRef}
      className=" bg-gradient-to-b from-white to-blue-100 md:py-32 py-5">
      <div className="container mx-auto text-center p-5 md:p-0 lg:pb-5">
        <div className=" relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-5">
            Sign up for newsletter
          </h1>
          <p className="my-4 md:w-[40%] mx-auto">
            Subscribe to our newsletter and stay informed about upcoming
            courses, events, and personalized recommendations for your learning
            journey.
          </p>
          <motion.img
            src={"/assets/3dbook.webp"}
            alt="book"
            width={360}
            height={100}
            className="absolute -left-[100px] -top-[137px] hidden lg:inline"
            style={{
              translateY,
            }}></motion.img>

          <motion.img
            src={"/assets/flexibility.png"}
            alt="book"
            width={260}
            height={100}
            className="absolute -right-[50px] -top-[-30px] hidden lg:inline"
            style={{
              translateY,
            }}></motion.img>
        </div>
        <form
          onSubmit={handleSubmitNewsletter}
          className="flex items-center justify-center gap-5 ">
          <div className=" flex items-center gap-1">
            <input
              className="input bg-[#DBE9FE] border focus:outline-none"
              type="email"
              required
              placeholder="Your Email"
            />
          </div>
          <button type="submit" className="btn bg-primary text-white">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Promotional;
