import Image from "next/image";

import logo from "/public/assets/learnicaNavlogo.png";
import { TbBrandFacebook } from "react-icons/tb";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
    return (
        <div>
            <footer className=" bg-blue-500  mt-6">
<div className=" lg:flex md:flex lg:justify-between md:justify-between md:pr-10 p-6
">
  <div className=" lg:ml-12">
  <Image className="md:w-60 lg:w-80 mb-5"   src={logo} alt="logo"></Image>
  </div>
  
  <div className=" flex gap-6 text-3xl lg:mt-5  lg:mr-28 justify-center">
   <div className="  border-[#f2f2f2]"><TbBrandFacebook /></div>
   <div className=" border-[#f2f2f2]"><FiGithub /></div>
   <div className="border-[#f2f2f2]"><FiLinkedin /></div>
  </div>
</div>
<div className=" pb-3 -mt-3 text-center">
    <h2 className=" text-center text-[30px] text-white font-bold">Web Warriors</h2>
    <p className="text-[20px] text-white font-bold">All rights reserved © 2024</p>
  </div>
      </footer>
        </div>
    );
};

export default Footer;