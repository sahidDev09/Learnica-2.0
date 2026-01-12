"use client";
import React from "react";
import companies from "/src/lib/companies.json";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

const Companies = () => {
  return (
    <div className="py-12 bg-white/50 border-y border-slate-100">
      <div className="container mx-auto">
        <p className="text-center text-slate-400 font-bold tracking-widest uppercase text-sm mb-10">Trusted by world leading companies</p>
        <Carousel
          plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
          className="w-full">
          <CarouselContent className="flex items-center">
            {companies.map(({ name, id, location }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex justify-center">
                <Image
                  src={location}
                  alt={name}
                  width={150}
                  height={80}
                  className="h-12 w-auto object-contain"
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
