"use client";
import { Button } from "@/components/ui/button";
import img1 from '../../../../public/assets/cybersecurity.jpg'
import img2 from '../../../../public/assets/uxui.png'
import Image from "next/image";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";

const CertificateSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="bg-blue-100 lg:h-[550px] container mx-auto rounded-2xl">
                {/* 3part */}
                <div className="lg:flex grid lg:gap-x-10 gap-y-5 py-20 px-10">
                    {/* 1st part */}
                    <div>
                        <h1 className="text-5xl font-bold">
                            Popular certificates, new AI skills.
                        </h1>
                        <p className="text-xl font-medium mt-10">
                            Get job-ready with Google Professional Certificates—now including AI skills.
                        </p>
                        <Button variant="destructive" className="rounded-lg mt-4">View All</Button>
                    </div>
                    {/* 2nd part */}
                    <div>
                        <div className="card bg-base-100 w-96 shadow-xl">
                           
                            <figure className="px-4 pt-4">
                                <Image
                                    src={img1}
                                    alt="Shoes"
                                    className="rounded-xl h-44" />
                            </figure>
                            <div className="card-body">
                                <h1 className="card-title font-bold text-xl">
                                    Google Cyber-Security
                                </h1>
                                <div className="flex">
                                    <FaBookmark className="text-gray-400 text-2xl" />
                                    <p className="text-blue-500 font-medium">Make progress towards a degree </p>

                                </div>
                                <p className="text-gray-700">Professional Certificate</p>
                            </div>
                        </div>
                    </div>
                    {/* 3rd part */}
                    <div>
                        <div className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-4 pt-4">
                                <Image
                                    src={img2}
                                    alt="Shoes"
                                    className="rounded-xl h-44 w-96" />
                            </figure>
                            <div className="card-body">
                                <h1 className="card-title font-bold text-xl">
                                    Google Cyber-Security
                                </h1>
                                <div className="flex">
                                    <FaBookmark className="text-gray-400 text-2xl" />
                                    <p className="text-blue-500 font-medium">Make progress towards a degree </p>

                                </div>
                                <p className="text-gray-700">Professional Certificate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateSection;
