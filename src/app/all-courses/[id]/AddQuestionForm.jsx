"use client";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

// req: add new question >>
const addQuestion = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/qna-ques", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

function AddQuestionForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: addQuestion });
  const user = useUser()
  const userEmail = user?.user.emailAddresses[0].emailAddress

  // handler: add question
  const handleAddQuestion = async (e) => {
    e.preventDefault();

    const formData = {
      question: e.target.question.value.trim(),
      userEmail,
      createdAt: Date.now(),
    };

    if (!formData.userEmail) {
      alert('you must logged in!')
      return;
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["qna-ques"]);
        // reset form and show alert
        e.target.reset();
        Swal.fire({
          title: "Successfully added the question!",
          icon: "success",
          confirmButtonColor: "#15803D",
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on adding question!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#B91C1C",
        });
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleAddQuestion} className="mx-auto relative">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-gray-500">
              Feel free to ask your queries:
            </span>
          </div>
          <textarea
            name="question"
            className="textarea focus:outline-none textarea-bordered h-20 shadow"
            placeholder="Ask your question here"
            required></textarea>
        </label>

        <div className="absolute bottom-2 right-4">
          <Button type="submit" className="bg-secondary">
            Ask
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddQuestionForm;
