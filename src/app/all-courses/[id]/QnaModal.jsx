"use client";

import { useQuery } from "@tanstack/react-query";
import AddAnswerForm from "./AddAnswerForm";
import Loader from "@/components/shared/Loader";

// dummy user
const user = {
  userName: "ali",
  userEmail: "ali@mail.com",
  userPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
};

function QnaModal({ question }) {
  // get answers based on question
  const {
    data: answers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["qna-ans", question._id],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/qna-ans?id=${question._id}`
      );
      return res.json();
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <dialog id={`modal_qna_${question._id}`} className="modal">
        <div className="modal-box ">
          {/* ------ modal content -------- */}
          <div>
            {/* question */}
            <div className="mb-4 my-4 bg-card p-2 rounded-md">
              <h3 className="text-secondary font-semibold text-lg">
                <span className=" text-primary">Q:</span> {question.question}
              </h3>
              <p className="text-sm text-gray-500">{question.userEmail}</p>
            </div>

            {/* form: write your answer */}
            <div className="mb-6">
              <AddAnswerForm
                question={question}
                user={user}
                refetch={refetch}
              />
            </div>

            {/* answers */}
            <div>
              {answers.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto">
                  {answers.map((ans) => (
                    <div key={ans._id} className="text-sm">
                      <p className="text-gray-500 mb-0.5">
                        Answer • {ans.userEmail}
                      </p>
                      <p>{ans.answer}</p>
                      <hr className="my-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-500">
                  No answer is available yet!
                </p>
              )}
            </div>
          </div>

          {/* ------- close (x) icon -------- */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default QnaModal;
