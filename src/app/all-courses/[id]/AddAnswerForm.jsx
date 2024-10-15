"use client"
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// req: add new answer >>
const addAnswer = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/qna-ans", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  return res.json()
}

function AddAnswerForm({question, user, refetch}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({ mutationFn: addAnswer })

  // handler: add question
  const handleWriteAnswer = async (e) => {
    e.preventDefault()

    const formData = {
      qid: question._id,
      answer: e.target.answer.value.trim(),
      userName: user.userName,
      userEmail: user.userEmail,
      userPhotoUrl: user.userPhotoUrl,
      createdAt: Date.now()
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['qna-ans'])

        // refetch ans, reset form and show alert
        refetch()
        e.target.reset()
        Swal.fire({
          title: "Successfully added the answer!",
          icon: "success",
          position: 'top',
          confirmButtonColor: "#15803D"
        })
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on adding answer!",
          text: error.message,
          icon: "error",
          position: 'top',
          confirmButtonColor: "#B91C1C"
        })
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleWriteAnswer} className="relative">
        <label className="form-control">
          <textarea name="answer" className="textarea textarea-bordered h-20 shadow" placeholder="Write your answer" required></textarea>
        </label>

        <div className='absolute bottom-2 right-4'>
          <button type='submit' className="btn btn-sm btn-outline btn-primary">Answer</button>
        </div>
      </form>
    </div>

  );
}

export default AddAnswerForm;