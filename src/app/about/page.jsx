"use client"
import Image from "next/image";
import React from "react";
import bandImage from "/public/assets/aboutBrandimage.png";
import googleMap from "/public/assets/google.jpg.webp";
import me from "/public/assets/team-members/numan.png";
import sahid from "/public/assets/team-members/sahid.png";
import rahat from "/public/assets/team-members/rahat.png";
import farha from "/public/assets/team-members/farha.png";
import mazed from "/public/assets/team-members/mazed.png";
import Link from "next/link";
import { FiLinkedin } from "react-icons/fi";
import { ImGithub } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import Faq from "@/components/homePage/Faq";
import MoveToTop from "@/components/homePage/MoveToTop";

const page = () => {
  return (
    <div className="container mx-auto p-4 md:p-0">
      {/* Top section */}
      <div className=" grid md:grid-cols-2 gap-10 mt-10">
        <div className="bg-secondary text-white p-10 rounded-xl">
          <h2 className="font-bold text-red-500">How it started</h2>
          <h1 className="pt-8 text-3xl lg:text-6xl font-bold">
            Our Dream is <br /> Global Learning <br /> Platform
          </h1>
          <p className="mt-8 lg:mt-10 mb-10 lg:mb-10 text-gray-300">
            We aim to revolutionize online education by providing an
            easy-to-use, community-driven platform where learning is
            interactive, efficient, and accessible to all. Our goal is to create
            a thriving educational ecosystem where students, teachers, and
            administrators collaborate to foster growth and knowledge.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Image 1 */}
          <div className=" w-full">
            <Image
              src={bandImage}
              alt="bandimage"
              width={1000}
              className="w-full h-[300px] object-cover rounded-xl hidden md:inline"
              height={1000}></Image>
          </div>
          <div className="w-full h-[300px] rounded-xl overflow-hidden hidden md:block">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7303.12975014924!2d90.35719480869143!3d23.76289124115171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf579e10e0ef%3A0x6b7325b0f90d6a27!2sMohammadpur%20Town%20Hall%20Market!5e0!3m2!1sen!2sbd!4v1730129792115!5m2!1sen!2sbd"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

        </div>
      </div>

      {/* Team Section */}
      <h2 className="font-bold text-red-500 mt-10 lg:mt-20 mb-6">
        How it started
      </h2>
      <h1 className="text-3xl lg:text-6xl font-bold my-3">
        Meet Our Dedicated Team of <br /> Learnica and Innovators
      </h1>

      {/* Developer Cards */}
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Developer Card 1 */}
          <div className="relative group w-full h-[450px] lg:h-[550px] overflow-hidden shadow-lg bg-white flex items-end p-6 transition-transform transform hover:-translate-y-3 rounded-2xl">
            <Image
              alt="Numan Ahmod"
              src={sahid}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 bg-secondary"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all">
              <h1 className="text-2xl font-bold uppercase">
                MD ABU SAHID{" "}
                <span className=" text-sm capitalize">(Team Leader)</span>
              </h1>
              <p className="mt-2 text-green-500 font-bold">
                MERN Stack developer && UI/UX designer
              </p>
              <a
                href="tel:+8801601321799"
                className="text-orange-400 hover:text-orange-500">
                {" "}
                +880 1601 321 799{" "}
              </a>
              <a
                className="  text-blue-500 font-bold hover:text-blue-600"
                href="mailto:iamsahidofficial99@gmail.com">
                iamsahidofficial99@gmail.com
              </a>
              <div className="flex text-2xl mt-4 gap-6"></div>
              <div className="flex text-2xl mt-4 gap-6">
                <Link
                  className="text-pink-500 hover:text-[#0A66C2]"
                  href={`https://www.linkedin.com/in/sahidofficial09`}>
                  <FiLinkedin />
                </Link>
                <Link
                  className="text-white hover:text-gray-500 transition-colors duration-300"
                  href={`https://github.com/sahidDev09`}>
                  <ImGithub />
                </Link>
                <Link
                  className="text-[#1877F2] hover:text-[#0E55A4] transition-colors duration-300"
                  href={`https://www.facebook.com/Sm.sahid99`}>
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>

          {/* Developer Card 2 */}
          <div className="relative group w-full h-[450px] lg:h-[550px] overflow-hidden shadow-lg bg-white flex items-end p-6 transition-transform transform hover:-translate-y-3 rounded-2xl">
            <Image
              alt="Numan Ahmod"
              src={me}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 bg-secondary"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all">
              <h1 className="text-2xl font-bold uppercase">Numan Ahmod</h1>
              <p className="mt-2 text-green-500 font-bold">
                A junior web developer
              </p>
              <a
                href="tel:+8801743888019"
                className="text-orange-400 hover:text-orange-500">
                {" "}
                +880 1743 888 019{" "}
              </a>

              <a
                className="  text-blue-500 font-bold hover:text-blue-600"
                href="mailto:numanahmod96@gmail.com">
                numanahmod96@gmail.com
              </a>
              <div className="flex text-2xl mt-4 gap-6">
                <Link
                  className="text-pink-500 hover:text-[#0A66C2]"
                  href={`https://www.linkedin.com/in/numan-ahmod`}>
                  <FiLinkedin />
                </Link>
                <Link
                  className="text-white hover:text-gray-500 transition-colors duration-300"
                  href={`https://github.com/numanahmod`}>
                  <ImGithub />
                </Link>
                <Link
                  className="text-[#1877F2] hover:text-[#0E55A4] transition-colors duration-300"
                  href={`https://www.facebook.com/numan12321`}>
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>

          {/* Developer Card 3 */}
          <div className="relative group w-full h-[450px] lg:h-[550px] overflow-hidden shadow-lg bg-white flex items-end p-6 transition-transform transform hover:-translate-y-3 rounded-2xl">
            <Image
              alt="Numan Ahmod"
              src={rahat}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 bg-secondary"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all">
              <h1 className="text-2xl font-bold uppercase">Rahat Faruk</h1>
              <p className="mt-2 text-green-500 font-bold">
                A junior web developer
              </p>
              <a
                href="tel:+8801874627950"
                className="text-orange-400 hover:text-orange-500">
                {" "}
                +880 1874 627 950{" "}
              </a>
              <br />
              <a
                className="  text-blue-500 font-bold hover:text-blue-600"
                href="mailto:rahatfaruk99@gmail.com">
                rahatfaruk99@gmail.com
              </a>
              <div className="flex text-2xl mt-4 gap-6"></div>
              <div className="flex text-2xl mt-4 gap-6">
                <Link
                  className="text-pink-500 hover:text-[#0A66C2]"
                  href={`https://www.linkedin.com/in/rahatfaruk`}>
                  <FiLinkedin />
                </Link>
                <Link
                  className="text-white hover:text-gray-500 transition-colors duration-300"
                  href={`https://github.com/rahatfaruk`}>
                  <ImGithub />
                </Link>
                <Link
                  className="text-[#1877F2] hover:text-[#0E55A4] transition-colors duration-300"
                  href={` https://www.facebook.com/rahatfaruk12`}>
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
          {/* Developer Card 4 */}
          <div className="relative group w-full h-[450px] lg:h-[550px] overflow-hidden shadow-lg bg-white flex items-end p-6 transition-transform transform hover:-translate-y-3 rounded-2xl">
            <Image
              alt="Numan Ahmod"
              src={mazed}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 bg-secondary"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all">
              <h1 className="text-2xl font-bold uppercase">
                Mohammad Abdul Mazed
              </h1>
              <p className="mt-2 text-green-500 font-bold">
                A junior web developer
              </p>
              <a
                href="tel:+8801640403998"
                className="text-orange-400 hover:text-orange-500">
                {" "}
                +880 1640 403 998{" "}
              </a>
              <br />
              <a
                className="  text-blue-500 font-bold hover:text-blue-600"
                href="mailto:mamazed1314@gmail.com">
                mamazed1314@gmail.com
              </a>
              <div className="flex text-2xl mt-4 gap-6"></div>
              <div className="flex text-2xl mt-4 gap-6">
                <Link
                  className="text-pink-500 hover:text-[#0A66C2]"
                  href={`https://www.linkedin.com/in/abdul-mazed`}>
                  <FiLinkedin />
                </Link>
                <Link
                  className="text-white hover:text-gray-500 transition-colors duration-300"
                  href={`https://github.com/Mazed1314`}>
                  <ImGithub />
                </Link>
                <Link
                  className="text-[#1877F2] hover:text-[#0E55A4] transition-colors duration-300"
                  href={`https://www.facebook.com/profile.php?id=100081633703122`}>
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
          {/* Developer Card 5 */}
          <div className="relative group w-full h-[450px] lg:h-[550px] overflow-hidden shadow-lg bg-white flex items-end p-6 transition-transform transform hover:-translate-y-3 rounded-2xl">
            <Image
              alt="Numan Ahmod"
              src={farha}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 bg-secondary"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all">
              <h1 className="text-2xl font-bold uppercase"> Farha</h1>
              <p className="mt-2 text-green-500 font-bold">
                A junior web developer
              </p>
              <a
                href="tel:+8801791237034"
                className="text-orange-400 hover:text-orange-500">
                {" "}
                +880 1791 237 034{" "}
              </a>
              <br />
              <a
                className="  text-blue-500 font-bold hover:text-blue-600"
                href="mailto:numanahmod96@gmail.com">
                sabikunnaharfarha01@gmail.com
              </a>
              <div className="flex text-2xl mt-4 gap-6"></div>
              <div className="flex text-2xl mt-4 gap-6">
                <Link
                  className="text-pink-500 hover:text-[#0A66C2]"
                  href={`https://www.linkedin.com/in/sabikun-nahar-farha-179412307`}>
                  <FiLinkedin />
                </Link>
                <Link
                  className="text-white hover:text-gray-500 transition-colors duration-300"
                  href={`https://github.com/farha12345678`}>
                  <ImGithub />
                </Link>
                <Link
                  className="text-[#1877F2] hover:text-[#0E55A4] transition-colors duration-300"
                  href={`https://www.facebook.com/faiza.islam.79274089?mibextid=ZbWKwL`}>
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Goal Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 py-10">
        <div className="object-cover rounded-2xl w-full h-[300px] bg-card p-8">
          <h3 className="text-red-400 text-xl font-bold">Our Goal</h3>
          <h1 className="text-2xl lg:text-4xl font-bold mt-6">
            Empowering Lives <br /> Through Education
          </h1>
          <p className="mt-6 text-gray-500">
            Our goal is to create a thriving educational ecosystem where
            students, teachers, and administrators collaborate to foster growth
            and knowledge.
          </p>
        </div>
        <div className="object-cover bg-card  rounded-2xl w-full lg:h-[300px]  p-8">
          <h2 className="text-red-400 text-2xl font-bold">
            Why you choose us...
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <p className="bg-white font-bold p-2 rounded-md pl-2 text-slate-400">
              Learning from home
            </p>
            <p className="bg-white font-bold p-2 rounded-md pl-2 text-slate-400">
              Professional certificate
            </p>
            <p className="bg-white font-bold p-2 rounded-md pl-2 text-slate-400">
              Financial aid support
            </p>
            <p className="bg-white font-bold p-2 rounded-md pl-2 text-slate-400">
              Affordable courses
            </p>
            <p className="bg-white font-bold p-2 rounded-md pl-2 text-slate-400">
              24/7 live supports
            </p>
            <p className="bg-white font-bold p-2 rounded-md pl-2 text-slate-400">
              200+ free courses
            </p>
          </div>
        </div>
      </div>

      <Faq />
      <MoveToTop/>
    </div>
  );
};

export default page;
