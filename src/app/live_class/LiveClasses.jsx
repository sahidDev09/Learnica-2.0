"use client"; // This line makes the component a Client Component

import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const LiveClasses = () => {
  const liveClasses = [
    {
      thumbnail: 'https://img-c.udemycdn.com/course/240x135/1931752_1012_15.jpg',
      courseName: 'Business Fundamentals: Marketing Strategy',
      category: 'Marketing',
      authorName: 'Brad',
      authorId: 'abc',
      authorEmail: 'brad@mail.com',
      liveLink: 'https://meet.google.com/ucs-gbhd-zvg',
      liveTime: '03:00 PM, 25 Sept'
    },
    {
      thumbnail: 'https://img-b.udemycdn.com/course/240x135/1463348_52a4_4.jpg',
      courseName: 'Modern JavaScript From The Beginning',
      category: 'Programming',
      authorName: 'Brad',
      authorId: 'abc',
      authorEmail: 'brad@mail.com',
      liveLink: 'https://meet.google.com/ucs-gbhd-zvg',
      liveTime: '03:30 PM, 25 Sept'
    },
    {
      thumbnail: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg',
      courseName: 'The Complete 2024 Web Development Bootcamp',
      category: 'Programming',
      authorName: 'Angela',
      authorId: 'abc',
      authorEmail: 'angela@mail.com',
      liveLink: 'https://meet.google.com/ted-xkcu-saa',
      liveTime: '04:00 PM, 25 Sept'
    },
    {
      thumbnail: 'https://img-c.udemycdn.com/course/240x135/1931752_1012_15.jpg',
      courseName: 'Business Fundamentals: Marketing Strategy',
      category: 'Marketing',
      authorName: 'Brad',
      authorId: 'abc',
      authorEmail: 'brad@mail.com',
      liveLink: 'https://meet.google.com/ted-xkcu-saa',
      liveTime: '05:00 PM, 25 Sept'
    },
    {
      thumbnail: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg',
      courseName: 'SEO Fundamentals',
      category: 'marketing',
      authorName: 'John Doe',
      authorId: 'def',
      authorEmail: 'john.doe@mail.com',
      liveLink: 'https://meet.google.com/iva-qium-ocq',
      liveTime: '03:00 PM, 25 Sept'
    },
    {
      thumbnail: 'https://img-c.udemycdn.com/course/240x135/1931752_1012_15.jpg',
      courseName: 'Mastering Digital Marketing',
      category: 'Marketing',
      authorName: 'Alice Lee',
      authorId: 'ghi',
      authorEmail: 'alice.lee@mail.com',
      liveLink: 'https://meet.google.com/iva-qium-ocq',
      liveTime: '03:30 PM, 25 Sept'
    }
  ];

  const joinClass = (liveLink, authorId) => {
    window.location.href = liveLink; // Redirect to the live class link
    
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center ">Live Classes</h1>
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveClasses.map((liveClass, index) => (
          <div 
            key={index} 
            className="bg-card rounded-lg shadow-md p-4   transition-colors duration-300"
          >
            <Image
              src={liveClass.thumbnail}
              alt="Course Thumbnail"
              width={256}
              height={144}
              className="w-full rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{liveClass.courseName}</h3>
            <p className="text-sm">Category: {liveClass.category}</p>
            <p className="text-sm">Author: {liveClass.authorName}</p>
            <p className="text-sm">Live Time: {liveClass.liveTime}</p>
            <button
              onClick={() => joinClass(liveClass.liveLink, liveClass.authorId)}
              className="mt-4 bg-primary text-white rounded-md px-3 py-2 hover:bg-orange-700 transition"
            >
              Join Live Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
