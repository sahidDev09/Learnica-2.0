"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

// req: edit note >>
const editNote = async (data) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/my-notes", {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

function NoteModal({note}) {  
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
        setIsEditing(false)
        
        Swal.fire({
          title: "Successfully edited the note!",
          icon: "success",
          confirmButtonColor: "#15803D",
          position: "top",
          timer: 1500
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
    <div>
      <dialog id={`modal_note_${note._id}`} className="modal">
        <div className="modal-box">
          {/* ------- close (x) icon -------- */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/* ------ modal content -------- */}
          <form onSubmit={handleEditNote}>
            {!isEditing ? (
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg">{note.title}</h3>
                <p>{note.description}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input type="text" name="title" className={"font-bold text-lg w-full input input-bordered bg-card"} defaultValue={note.title} />
                <textarea name="description" className="textarea textarea-bordered text-sm w-full min-w-0 h-64 bg-card" defaultValue={note.description}></textarea>
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

          
        </div>
      </dialog>
    </div>
  );
}

export default NoteModal;