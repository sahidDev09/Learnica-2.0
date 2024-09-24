import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import logo from "/public/assets/learnicaNavlogo.png";
import not from "/public/assets/4.4.jpg";

function NotFound () {
  return (
    <section className="bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<Image src={not} width={700} height={900} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
		 <div className="wf-ull lg:w-1/2">
            <p className="text-5xl font-bold leading-none sm:text-6xl text-violet-600 mt-6">Oops! </p>
            <h1 className=" text-red-600 mt-3 text-3xl font-semibold  dark:text-white md:text-3xl">Page not found</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn`t exist. Go back Home</p>

            <div className="flex items-center mt-6 gap-x-3">
                

                <Link href={`/`}>
                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                    Back to home
                </button>
                </Link>
            </div>
        </div>
	</div>
</section>
  )
}

export default NotFound;