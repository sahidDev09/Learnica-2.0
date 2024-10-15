"use client"
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// dummy user
const user = {
  userName: "ali",
  userEmail: "ali@mail.com",
  userPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
}

// req: add new question >>
const addQuestion = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/qna-ques", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  return res.json()
}

function AddQuestionForm() {
  const queryClient = useQueryClient()
  const mutation = useMutation({ mutationFn: addQuestion })

  // handler: add question
  const handleAddQuestion = async (e) => {
    e.preventDefault()

    const formData = {
      question: e.target.question.value.trim(),
      userName: user.userName,
      userEmail: user.userEmail,
      userPhotoUrl: user.userPhotoUrl,
      createdAt: Date.now()
    }

    console.log({formData});
    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['qna-ques'])
        // reset form and show alert
        e.target.reset()
        Swal.fire({
          title: "Successfully added the question!",
          icon: "success",
          confirmButtonColor: "#15803D"
        })
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on adding question!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#B91C1C"
        })
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleAddQuestion} className="mx-auto relative">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Ask question:</span>
          </div>
          <textarea name="question" className="textarea textarea-bordered h-20 shadow" placeholder="Ask your question here" required></textarea>
        </label>

        <div className='absolute bottom-2 right-4'>
          <button type='submit' className="btn btn-sm btn-outline btn-primary">Ask</button>
        </div>
      </form>
    </div>

  );
}

export default AddQuestionForm;