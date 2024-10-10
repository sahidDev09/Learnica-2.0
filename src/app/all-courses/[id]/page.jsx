import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Reviews from "./Reviews";
import AddReviewForm from "./AddReviewForm";
import AddNoteForm from "./AddNoteForm";
import Notes from "./Notes";
import Resources from "./Resources";

const page = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${params.id}`
  );

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
        <div className="lg:w-5/12">
          <div className=" bg-card p-6 rounded-xl">
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
                <>
                  <div
                    key={index}
                    className="flex gap-2 items-center p-2 bg-white w-full rounded-md">
                    <Image
                      width={60}
                      height={60}
                      src={"/assets/video_thumbnail.png"}
                      alt="video_thumbnail"
                      className="rounded"></Image>
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
        </div>
        <div className="lg:w-7/12 lg:px-6 my-6 lg:my-0">
          {/* <video width="600" className="w-full rounded-xl" controls>
            <source
              src="https://www.youtube.com/watch?v=kmZz0v4COpw&t=314s"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
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
            className="tabs tabs-bordered border-primary my-4 bg-card">
            {/*--------------------------------- Overview --------------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              className="tab mx-2 px-2"
              aria-label="Overview"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content py-4 bg-white">
              <h2 className="text-lg md:text-xl font-semibold">{data.title}</h2>
              <div className="flex gap-5 my-4">
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
              <h4 className="text-primary">Author</h4>
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
              className="tab mx-2 px-2"
              aria-label="Q&A"
            />
            <div role="tabpanel" className="tab-content p-10 bg-white">
              Question and answer
            </div>
            {/*------------------------------- Notes ----------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2"
              aria-label="Notes"
            />
            <div role="tabpanel" className="tab-content p-10 bg-white">
              <AddNoteForm />
              <Notes />
            </div>
            {/*------------------------------- Reviews --------------------------*/}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2"
              aria-label="Reviews"
            />
            <div role="tabpanel" className="tab-content p-4 bg-white">
              <AddReviewForm />
              <Reviews />
            </div>

            {/*------------------------------- Attachment --------------------------*/}

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab mx-2 px-2"
              aria-label="Resources"
            />
            <div role="tabpanel" className="tab-content p-4 bg-white">
              <Resources />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
