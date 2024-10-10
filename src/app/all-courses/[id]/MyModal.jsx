"use client"
import Modal from "react-responsive-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// req: edit note >>
const editNote = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/my-notes", {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  return res.json()
}

function MyModal({ open, onCloseModal, note }) {
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({mutationFn: editNote})

  // handler: edit course
  const handleEditNote = async (e) => {
    e.preventDefault()

    const formData = {
      title: e.target.title.value.trim(),
      description: e.target.description.value.trim(),
    }

    mutation.mutate({data: formData, _id: note._id}, {
      onSuccess: () => {
        queryClient.invalidateQueries(['my-notes'])
        
        Swal.fire({
          title: "Successfully edited the note!",
          icon: "success",
          confirmButtonColor: "#15803D"
        })
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on eidting note!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#B91C1C"
        })
      }
    })
  }

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <form onSubmit={handleEditNote} className="w-full">
        {!isEditing ? (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input type="text" name="title" className={"block font-bold text-lg w-full min-w-0 input input-bordered bg-card"} defaultValue={note.title} />
            <textarea name="description" className="block textarea textarea-bordered text-sm w-full min-w-0 h-64 bg-card" defaultValue={note.description}></textarea>
          </div>
        )}


        {/* --------- action buttons --------- */}
        <div className="mt-6 space-x-4">
          {isEditing &&
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          }
          <button type="button" className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default MyModal;