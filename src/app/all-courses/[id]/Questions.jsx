"use client"
import { FaReplyAll } from "react-icons/fa";
import AddQuestionForm from "./AddQuestionForm";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";

function Questions() {
  // get quesions
  const {data: questions, isLoading} = useQuery({
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
      <AddQuestionForm />

      {/* -------- all quesions ---------- */}
      {questions.length > 0 ? (
        <div className="space-y-4 max-h-[600px] border p-3 mt-6 rounded-md overflow-y-auto">
          {questions.map(ques => (
            <div key={ques._id} className="border p-3 rounded-md shadow-md bg-card mb-3">
              <p className="text-sm text-gray-500">{ques.userName} • {new Date(ques.createdAt).toLocaleDateString()}</p>
              <h3 className="text-primary font-semibold text-lg my-1">Q: {ques.question}</h3>
              <div>
                <p className="flex gap-2 items-center">
                  <FaReplyAll /> 2
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">You have not added any notes!</p>
      )
      }

    </section>
  );
}

export default Questions;

