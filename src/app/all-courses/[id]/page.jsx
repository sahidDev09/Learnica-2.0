"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Reviews from "./Reviews";
import AddReviewForm from "./AddReviewForm";
import AddNoteForm from "./AddNoteForm";
import Notes from "./Notes";
import Resources from "./Resources";
import { PlaySquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Questions from "./Questions";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MyReview from "./MyReview";

const Page = ({ params }) => {
  const { user } = useUser();

  if (!user) {
    redirect("/?sign-in=true");
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${params.id}`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  // const { user } = useUser();

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
      {/* approve button */}

      {data?.status == "pending" && (
        <div className="w-7/12 mx-auto ">
          <div className="my-6 bg-yellow-400 rounded-xl p-8">
            <h2 className="text-xl font-medium text-center my-3">
              This is a pending course
            </h2>
            <h2 className="text-lg font-semibold text-center my-3">
              Do you approve it..?
            </h2>
            <div className="flex justify-center mt-5">
              <button className="btn btn-2xl bg-green-600 text-white border-0">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto flex flex-col-reverse lg:flex-row px-2">
        <div className="lg:w-5/12">
          <div className=" bg-card p-6 h-full rounded-xl">
            {/* title */}
            <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
            {/* progress */}
            <div className="flex gap-2 items-center my-4">
              <progress
                className="progress progress-error w-56"
                value="10"
                max="100"></progress>
              <span className="font-semibold">10%</span>
            </div>
            {/* content */}
            <div className="space-y-3">
              {topic.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center p-2 bg-white w-full rounded-md">
                  <div className=" bg-secondary p-2 rounded-md">
                    <PlaySquare className=" size-8 text-white" />
                  </div>
                  <div className="text-start w-full ml-2">
                    <h2 className="text-lg md:text-lg font-semibold">
                      {index + 1}. {item.title}
                    </h2>
                    <h4 className="ml-5">Duration : {item.duration} min</h4>
                  </div>
                  <button className="btn btn-sm bg-secondary text-white">
                    Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-7/12 lg:px-6 w-full px-4 my-6 lg:my-0">
          <iframe
            className="w-full rounded-xl"
            width="600"
            height="340"
            src="https://www.youtube.com/embed/kmZz0v4COpw?start=314"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
          {/* tab */}
          <div
            role="tablist"
            className="tabs tabs-bordered mt-4 bg-secondary pt-4 rounded-md w-full sm:max-w-none md:max-w-none lg:max-w-full flex flex-col md:inline-grid">
            {/*--------------------------------- Overview --------------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2 text-white"
              aria-label="Overview"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content py-4 min-h-full bg-white w-full">
              <h2 className="text-lg md:text-xl font-semibold">{data.title}</h2>
              <div className="flex gap-5 my-4 w-full">
                <div className="text-center">
                  <div className="flex gap-2">
                    <span className="font-semibold text-xl">4.6</span>{" "}
                    <FaStar className="text-xl mt-1 text-orange-600" />
                  </div>
                  <h4 className="text-gray-400 font-semibold">
                    34,506 ratings
                  </h4>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl">5,406</div>
                  <h4 className="text-gray-400 font-semibold">Students</h4>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl">50 h</div>
                  <h4 className="text-gray-400 font-semibold">total</h4>
                </div>
              </div>

              <h4 className="my-4">Last update 2024</h4>

              {/* author card */}
              <h4 className="text-secondary mb-2">Author</h4>
              <div className="flex gap-2 items-center p-2 bg-card rounded-md">
                <Image
                  width={30}
                  height={30}
                  src={"/assets/developers/numan.jpg"}
                  alt="video_thumbnail"
                  className="rounded w-16 h-16"></Image>
                <div className="text-start">
                  <h2 className="text-lg md:text-xl font-semibold">Jhon doe</h2>
                  <h4 className="text-gray-500">Web Developer </h4>
                </div>
              </div>
            </div>
            {/* --------------------------- Q&A -------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2 text-white"
              aria-label="Q&A"
            />
            <div role="tabpanel" className="tab-content py-4 bg-white w-full">
              <Questions />
            </div>
            {/*------------------------------- Notes ----------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2 text-white"
              aria-label="Notes"
            />
            <div role="tabpanel" className="tab-content py-2 bg-white w-full">
              <AddNoteForm />
              <Notes />
            </div>
            {/*------------------------------- Reviews --------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2 text-white"
              aria-label="Reviews"
            />
            <div role="tabpanel" className="tab-content pt-4 bg-white w-full">
              <MyReview />
              <Reviews />
            </div>

            {/*------------------------------- Attachment --------------------------*/}

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2 text-white"
              aria-label="Resources"
            />
            <div role="tabpanel" className="tab-content bg-white pt-2 w-full">
              <Resources courseId={data._id} userid={data.userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
