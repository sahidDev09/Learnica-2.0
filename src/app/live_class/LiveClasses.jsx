"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Tag, Video, ExternalLink, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { parse, differenceInSeconds } from "date-fns";

import Loading from "../loading";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      try {
        const target = parse(targetDate, "hh:mm a, dd MMM yyyy", new Date());
        return differenceInSeconds(target, now);
      } catch (error) {
        console.error("Error parsing date:", error);
        return 0;
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const diff = calculateTimeLeft();
      setTimeLeft(diff);
      if (diff <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft === null) return null;

  if (timeLeft <= 0) {
    return (
      <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
        <Timer className="w-3 h-3" />
        Session Expired
      </span>
    );
  }

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex gap-1 items-center bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
      <Timer className="w-3 h-3 animate-pulse" />
      {days > 0 && <span>{days}d</span>}
      <span>{hours.toString().padStart(2, '0')}h</span>
      <span>{minutes.toString().padStart(2, '0')}m</span>
      <span>{seconds.toString().padStart(2, '0')}s</span>
    </div>
  );
};

const LiveClasses = () => {
  const { data: liveClasses, isLoading } = useQuery({
    queryKey: ["live-class"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/live_classes`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12 mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-secondary/10 rounded-full">
            <Video className="w-8 h-8 text-secondary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-blue-600 mb-4">
          Live Classes
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Join our interactive live sessions to enhance your skills and learn directly from industry experts.
        </p>
      </motion.div>

      {/* Responsive Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {liveClasses?.map((liveClass, index) => {
          const isExpired = () => {
            try {
              const target = parse(liveClass.liveTime, "hh:mm a, dd MMM yyyy", new Date());
              return differenceInSeconds(target, new Date()) <= 0;
            } catch (e) {
              return false;
            }
          };
          const expired = isExpired();

          return (
            <motion.div
              variants={cardVariants}
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={
                    liveClass.thumbnail?.startsWith("http") ||
                    liveClass.thumbnail?.startsWith("/")
                      ? liveClass.thumbnail
                      : "/assets/3dEdu.webp"
                  }
                  alt={liveClass.courseName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {!expired ? (
                    <Link href={liveClass.liveLink} target="_blank">
                      <button className="bg-white/20 backdrop-blur-sm text-white border border-white/50 rounded-full px-6 py-2 hover:bg-white hover:text-secondary transition-all font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Video className="w-4 h-4" />
                        Join Now
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-500/50 backdrop-blur-sm text-white border border-white/30 rounded-full px-6 py-2 cursor-not-allowed font-medium flex items-center gap-2">
                       <Timer className="w-4 h-4" />
                       Expired
                    </button>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-5">
                <div className="mb-auto">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {liveClass.category}
                    </span>
                    <CountdownTimer targetDate={liveClass.liveTime} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">
                    {liveClass.courseName}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4 text-secondary/80 flex-shrink-0" />
                      <span className="truncate">by <span className="font-medium text-gray-900 dark:text-white">{liveClass.authorName}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 text-secondary/80 flex-shrink-0" />
                      <span className="font-medium">{liveClass.liveTime}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {expired ? "Closed" : "Live Session"}
                  </span>
                  {!expired ? (
                    <Link href={liveClass.liveLink} target="_blank">
                      <button className="text-secondary hover:text-blue-600 font-semibold text-sm flex items-center gap-1 transition-colors group/btn">
                        Join Class
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </Link>
                  ) : (
                    <span className="text-red-500 text-sm font-semibold italic">Session Expired</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {liveClasses?.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300"
        >
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
             <Video className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No live classes scheduled</h3>
          <p className="text-gray-500">Check back later for upcoming sessions.</p>
        </motion.div>
      )}
    </div>
  );
};

export default LiveClasses;
