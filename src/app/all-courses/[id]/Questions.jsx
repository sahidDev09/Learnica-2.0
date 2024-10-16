"use client"
import { FaReplyAll } from "react-icons/fa";
import AddQuestionForm from "./AddQuestionForm";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import QnaModal from "./QnaModal";

function Questions() {
  // get quesions
  const {data: questions, isLoading, refetch} = useQuery({
    queryKey: ['qna-ques'],
    queryFn: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/qna-ques")
      return res.json()
    }
  })
  
  if (isLoading) { return <Loader/> }
  return (  
    <section className="max-w-screen-lg mx-auto">
      <header className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">QnA</h2>
      </header>

      {/* -------- ask quesion form ---------- */}
      <AddQuestionForm refetch={refetch} />

      {/* -------- all quesions ---------- */}
      {questions.length > 0 ? (
        <div className="space-y-4 max-h-[600px] border p-3 mt-6 rounded-md overflow-y-auto">
          {questions.map(ques => (
            <div key={ques._id} className="border p-3 rounded-md shadow-md bg-card mb-3">
              <h3 className="text-primary font-semibold text-lg mb-1">
                <button 
                  onClick={() => document.getElementById(`modal_qna_${ques._id}`).showModal()} 
                >Q: {ques.question}</button>
              </h3>
              <p className="text-sm text-gray-500">{ques.userEmail} • {new Date(ques.createdAt).toLocaleDateString()}</p>

              <QnaModal question={ques} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">You have not added any question!</p>
      )
      }

    </section>
  );
}

export default Questions;

