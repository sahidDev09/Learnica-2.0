"use client";
import { FaTrashAlt } from "react-icons/fa";
import AddQuestionForm from "./AddQuestionForm";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/shared/Loader";
import QnaModal from "./QnaModal";
import Image from "next/image";
import Swal from "sweetalert2";

function Questions({courseId}) {
  const user = useUser()
  const userEmail = user?.user.emailAddresses[0].emailAddress

  // get quesions
  const {
    data: questions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["qna-ques", courseId],
    queryFn: async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/qna-ques?courseId=${courseId}`
      );
      return res.json();
    },
  });

  // handle delete note
  const handleQuestionDelete = async (questionId) => {
    try {
      // confirmation alert
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#15803D",
        cancelButtonColor: "#B91C1C",
        confirmButtonText: "Yes, delete it!",
      });
      if (!isConfirmed) return;

      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/qna-ques",
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ questionId }),
        }
      );
      await res.json();
      Swal.fire({
        title: "Successfully deleted the question!",
        icon: "success",
        confirmButtonColor: "#15803D",
      });
      // refetch notes
      await refetch();
    } catch (error) {
      Swal.fire({
        title: "Error on deleting question!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="max-w-screen-lg mx-auto">
      <header className="mb-4">
        <h2 className="text-xl md:text-3xl font-semibold text-secondary">QnA</h2>
      </header>

      {/* -------- ask quesion form ---------- */}
      <AddQuestionForm refetch={refetch} courseId={courseId} />

      {/* -------- all quesions ---------- */}
      {questions.length > 0 ? (
        <div className="space-y-4 max-h-[600px] border p-3 mt-6 rounded-md overflow-y-auto">
          {questions.map((ques) => (
            <div
              key={ques._id}
              className="border p-3 rounded-md shadow-md bg-card mb-3">
              <h3 className="text-secondary font-semibold text-lg mb-1">
                <button
                  onClick={() =>
                    document.getElementById(`modal_qna_${ques._id}`).showModal()
                  }>
                  <span className=" text-primary">Q:</span> {ques.question}
                </button>
              </h3>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <p>{ques.userEmail} • </p>
                <p>{new Date(ques.createdAt).toLocaleDateString()} </p>
                {ques.userEmail === userEmail && (
                  <button
                    onClick={() => handleQuestionDelete(ques._id)}
                    className="ml-auto p-1 border border-transparent hover:border-red-600 text-red-600 rounded hover:-translate-y-1 transition-all">
                      <FaTrashAlt />
                  </button>
                )}
              </div>

              <QnaModal question={ques} courseId={courseId} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center mx-auto">
          <Image
            src={"/assets/noData.png"}
            className="flex mx-auto"
            alt="nodata"
            width={100}
            height={100}
          />
          <p>No queries currently available.</p>
        </div>
      )}
    </section>
  );
}

export default Questions;
