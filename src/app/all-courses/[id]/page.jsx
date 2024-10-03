"use client";
import Image from "next/image";
import React from "react";
import { MdDateRange } from "react-icons/md";

const page = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/courses/${params.id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen py-10">
        <h2>Course not found</h2>
      </div>
    );
  }
  // const { user } = useUser();
  const data = await res.json();
  const topic = [
    {
      title: "Introduction to JavaScript",
      duration: "2",
    },
    {
      title: "React Basics",
      duration: "3",
    },
    {
      title: "Understanding Node.js",
      duration: "1.5",
    },
    {
      title: "MongoDB Essentials",
      duration: "2.5",
    },
    {
      title: "Advanced CSS Techniques",
      duration: "4",
    },
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row px-2">
        <div className="lg:w-5/12 bg-cyan-100 p-6 rounded-xl">
          {/* title */}
          <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
          {/* progress */}
          <div className="flex gap-2 items-center my-4">
            <progress
              className="progress progress-error w-56"
              value="10"
              max="100"
            ></progress>
            <span className="font-semibold">10%</span>
          </div>
          {/* content */}
          <div className="space-y-3">
            {topic.map((item, index) => (
              <>
                <div className="flex gap-2 items-center p-2 bg-white w-full rounded-md">
                  <Image
                    width={60}
                    height={60}
                    src={"/assets/video_thumbnail.png"}
                    alt="video_thumbnail"
                    className="rounded"
                  ></Image>
                  <div className="text-start w-full">
                    <h2 className="text-lg md:text-xl font-semibold">
                      {index + 1}. {item.title}
                    </h2>
                    <h4 className="ml-5">Duration : {item.duration} min</h4>
                  </div>
                  <button className="btn btn-sm bg-red-400 text-white">
                    Play
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="lg:w-7/12 lg:px-6 my-6 lg:my-0">
          <video width="600" className="w-full rounded-xl" controls>
            <source
              src="https://www.youtube.com/watch?v=kmZz0v4COpw&t=314s"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* tab */}
          <div role="tablist" className="tabs tabs-bordered my-4 bg-cyan-100">
            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2"
              aria-label="Tab 1"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content p-10 bg-white">
              Tab content 1
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2"
              aria-label="Tab 2"
            />
            <div role="tabpanel" className="tab-content p-10 bg-white">
              Tab content 2
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2"
              aria-label="Tab 3"
            />
            <div role="tabpanel" className="tab-content p-10 bg-white">
              Tab content 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
