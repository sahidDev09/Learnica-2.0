"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import AddAnswerForm from "./AddAnswerForm";
import Loading from "@/app/loading";
import { FaTrashAlt } from "react-icons/fa";

// dummy user
const user = {
  userName: "ali",
  userEmail: "ali@mail.com",
  userPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
};

function QnaModal({ question, courseId }) {
  const user = useUser()
  const userEmail = user?.user.emailAddresses[0].emailAddress

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

  // handle delete answer
  const handleAnswerDelete = async (ansId) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/qna-ans?id=${ansId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ansId }),
        }
      );
      await res.json();
      // refetch notes
      await refetch();
    } catch (error) {
      Swal.fire({
        title: "Error on deleting note!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <dialog id={`modal_qna_${question._id}`} className="modal">
        <div className="modal-box ">
          {/* ------ modal content -------- */}
          <div>
            {/* question */}
            <div className="mb-4 my-4 bg-card p-3 rounded-md">
              <h3 className="text-secondary font-semibold text-lg">
                <span className=" text-primary">Q:</span> {question.question}
              </h3>
              <p className="text-sm text-gray-500">{question.userEmail}</p>
            </div>

            {/* form: write your answer */}
            <div className="mb-6">
              <AddAnswerForm
                question={question}
                refetch={refetch}
                courseId={courseId}
              />
            </div>

            {/* answers */}
            <div>
              {answers.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto">
                  <h3 className="mb-2 font-semibold text-secondary">Answers:</h3>
                  {answers.map((ans) => (
                    <div key={ans._id} className="text-sm">
                      <p className="text-gray-500 mb-0.5 flex gap-2">
                        <span>{ans.userEmail} • </span>
                        <span>{new Date(ans.createdAt).toLocaleDateString()} </span>

                        {userEmail === ans.userEmail && 
                          <button
                            onClick={() => handleAnswerDelete(ans._id)}
                            className="ml-auto p-1 border border-transparent hover:border-red-600 text-red-600 rounded hover:-translate-y-1 transition-all">
                              <FaTrashAlt />
                          </button>
                        }
                      </p>
                      <p>{ans.answer}</p>
                      <hr className="my-3" />
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
