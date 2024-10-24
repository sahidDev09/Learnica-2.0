"use client";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

// req: add new answer >>
const addAnswer = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/qna-ans", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

function AddAnswerForm({ question, refetch }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: addAnswer });
  const user = useUser()
  const userEmail = user?.user.emailAddresses[0].emailAddress

  // handler: add question
  const handleWriteAnswer = async (e) => {
    e.preventDefault();

    const formData = {
      qid: question._id,
      answer: e.target.answer.value.trim(),
      userEmail,
      createdAt: Date.now(),
    };

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["qna-ans"]);

        // refetch ans, reset form and show alert
        refetch();
        e.target.reset();
        Swal.fire({
          title: "Successfully added the answer!",
          icon: "success",
          position: "top",
          timer: 2000,
          confirmButtonColor: "#15803D",
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on adding answer!",
          text: error.message,
          icon: "error",
          position: "top",
          confirmButtonColor: "#B91C1C",
        });
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleWriteAnswer} className="relative">
        <label className="form-control">
          <textarea
            name="answer"
            className="textarea focus:outline-none textarea-bordered h-20 shadow"
            placeholder="Write your answer"
            required></textarea>
        </label>

        <div className="absolute bottom-2 right-4">
          <Button type="submit" className="bg-secondary">
            Answer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddAnswerForm;
