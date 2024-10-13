import Image from "next/image";
import Link from "next/link";
import React from "react";
import not from "/public/assets/errorImg.png";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <section className="bg-secondary h-screen flex">
      <div className="md:flex items-center container mx-auto md:*:-mt-32">
        <div>
          <Image src={not} width={600} height={600} alt="error-page" />
        </div>
        <div className="flex flex-col gap-3 text-center md:text-start">
          <h1 className="md:text-5xl text-3xl font-black uppercase text-white">
            Opps! Page Not found
          </h1>
          <p className=" text-gray-400 text-lg">
            Please try again with actual route or refresh the page
          </p>

          <Link href="/">
            <Button variant="destructive" className="w-fit">
              Back home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
