"use client";
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import img1 from '../../../../public/assets/cybersecurity.jpg';
import img2 from '../../../../public/assets/uxui.png';

const CertificateSection = () => {
	return (
		<div className="py-10 px-4">
			<div className="bg-card lg:h-[550px] container mx-auto rounded-2xl p-6 lg:p-10">
				<div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-10 py-10">
					{/* 1st part */}
					<div className="text-center lg:text-left lg:self-center">
						<h1 className="text-secondary text-3xl lg:text-4xl font-bold">
							Popular certificates, new AI skills.
						</h1>
						<p className="text-lg lg:text-xl font-medium mt-6">
							Get job-ready with Google Professional Certificates—now including AI skills.
						</p>
					</div>
					{/* 2nd part */}
					<div className="mx-auto lg:mx-0">
						<div className="card bg-base-100 shadow-xl">
							<figure className="px-4 pt-4">
								<Image
									src={img1}
									alt="Cybersecurity"
									className="rounded-xl h-44  w-full object-cover"
								/>
							</figure>
							<div className="card-body">
								<h1 className="card-title font-bold text-lg lg:text-xl">
									Google Cyber-Security
								</h1>
								<div className="flex items-center mt-2">
									<FaBookmark className="text-gray-400 text-xl lg:text-2xl" />
									<p className="text-blue-500 font-medium ml-2 text-sm lg:text-base">
										Make progress towards a degree
									</p>
								</div>
								<p className="text-gray-700 text-sm lg:text-base">
									Professional Certificate
								</p>
							</div>
						</div>
					</div>
					{/* 3rd part */}
					<div className="mx-auto lg:mx-0">
						<div className="card bg-base-100 shadow-xl">
							<figure className="px-4 pt-4">
								<Image
									src={img2}
									alt="UX/UI"
									className="rounded-xl h-44 w-full object-cover"
								/>
							</figure>
							<div className="card-body">
								<h1 className="card-title font-bold text-lg lg:text-xl">
									Google UX/UI Design
								</h1>
								<div className="flex items-center mt-2">
									<FaBookmark className="text-gray-400 text-xl lg:text-2xl" />
									<p className="text-blue-500 font-medium ml-2 text-sm lg:text-base">
										Make progress towards a degree
									</p>
								</div>
								<p className="text-gray-700 text-sm lg:text-base">
									Professional Certificate
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CertificateSection;
