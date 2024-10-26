"use client";
import React from "react";
import companies from "/src/lib/companies.json";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

const Companies = () => {
  return (
    <div className="mt-5">
      <div className="container mx-auto py-4 rounded-md">
        <Carousel
          plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
          className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, location }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <Image
                  src={location}
                  alt={name}
                  width={180}
                  height={180}
                  className="h-24 sm:h-34 w-auto object-contain text-black"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Companies;
