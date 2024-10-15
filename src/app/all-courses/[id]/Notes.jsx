"use client"
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import NoteModal from "./NoteModal";
import Loader from "@/components/shared/Loader";

function Notes() {
  // get notes
  const { data: notes, isLoading, refetch } = useQuery({
    queryKey: ['my-notes'],
    queryFn: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/my-notes')
      return res.json()
    }
  })

  // handle delete note
  const handleNoteDelete = async (noteId) => {
    try {
      // confirmation alert
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#15803D",
        cancelButtonColor: "#B91C1C",
        confirmButtonText: "Yes, delete it!"
      })
      if (!isConfirmed) return;

      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/my-notes", {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ noteId })
      })
      await res.json()
      Swal.fire({
        title: "Successfully deleted the note!",
        icon: "success",
        confirmButtonColor: "#15803D"
      })
      // refetch notes  
      await refetch()
    } catch (error) {
      Swal.fire({
        title: "Error on deleting note!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C"
      })
    }
  }

  if (isLoading) { return <Loader /> }
  return (
    <section className="max-w-screen-lg mx-auto my-6">
      <header className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">My Notes</h2>
      </header>

      {/* cards */}
      {notes.length > 0
        ? (
          <div className="space-y-5 max-h-[600px] border p-3 rounded-md overflow-y-auto">
            {notes.map(note => (
              <div key={note._id} className="relative border p-4 rounded-md shadow-md bg-card mb-3">
                <h3 className="text-primary font-semibold text-lg mb-1">{note.title}</h3>
                {/* <p className="text-sm text-gray-500">{note.description}</p> */}
                <p className="text-sm text-gray-500">
                  {note.description.length > 300 ? note.description.slice(0, 300) + '...' : note.description}
                  {" "}
                  <button className="link link-primary ml-3" onClick={() => document.getElementById(`modal_note_${note._id}`).showModal()}>view details</button> 
                </p>
                {/* ------- action btns --------- */}
                <div>
                  <button onClick={() => handleNoteDelete(note._id)} className="p-1 border border-transparent hover:border-red-600 text-red-600 hover:-translate-y-1 rounded transition-all absolute bottom-2 right-2">
                    <FaTrashAlt />
                  </button>
                </div>

                <NoteModal note={note} />
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

export default Notes;