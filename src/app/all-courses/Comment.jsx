import Image from "next/image";
import { MdDateRange } from "react-icons/md";

const Comment = () => {
  return (
    <div>
      <section className="border bg-base-300 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold">Comment</h2>
          </div>

          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-base-200 rounded-lg rounded-t-lg border ">
              <label className="sr-only">Your comment</label>
              <textarea
                name="comment"
                rows="6"
                className="px-0 w-full bg-base-200 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="font-medium text-white bg-red-400 btn rounded-lg  "
            >
              Post comment
            </button>
          </form>

          <article className="p-6 bg-base-200 rounded-lg mb-3">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="flex">
                  <Image
                    width={100}
                    height={100}
                    className="mr-2 w-10 h-10 border rounded-full"
                    src="/public/assets/courseui.png"
                    alt="Michael Gough"
                  ></Image>
                  <span className="text-gray-700 text-xl font-semibold">
                    Commenter
                    <div className="text-sm">
                      <span className="flex">
                        <MdDateRange className="mt-1" />
                        22.20.21
                      </span>
                    </div>
                  </span>
                </p>
              </div>
            </footer>
            <p className="text-gray-500 ">very good courses</p>
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
              >
                <svg
                  className="mr-1.5 w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Reply
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Comment;
