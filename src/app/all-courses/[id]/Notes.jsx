"use client";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import NoteModal from "./NoteModal";
import Image from "next/image";
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";

function Notes({ courseId }) {
  const user = useUser();
  const userEmail = user?.user?.emailAddresses[0]?.emailAddress;

  // get notes
  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-notes", courseId],
    queryFn: async () => {
      const res = await fetch(
        `/api/my-notes?email=${userEmail}&courseId=${courseId}`
      );
      return res.json();
    },
  });

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
        confirmButtonText: "Yes, delete it!",
      });
      if (!isConfirmed) return;

      const res = await fetch(
        "/api/my-notes",
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ noteId }),
        }
      );
      await res.json();
      Swal.fire({
        title: "Successfully deleted the note!",
        icon: "success",
        confirmButtonColor: "#15803D",
      });
      // refetch notes
      await refetch();
    } catch (error) {
      Swal.fire({
        title: "Error on deleting note!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="max-w-screen-lg mx-auto my-6">
      <header className="mb-4">
        <h2 className="text-xl md:text-xl font-semibold">My Notes</h2>
      </header>

      {/* cards */}
      {notes.length > 0 ? (
        <div className="space-y-5 max-h-[600px] border p-3 rounded-md overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note._id}
              className="relative border p-4 rounded-md shadow-md bg-card mb-3">
              <h3 className="text-secondary font-semibold text-lg mb-1">
                {note.title}
              </h3>
              <p className="text-sm text-gray-500">
                {note.description.length > 300
                  ? note.description.slice(0, 200) + "..."
                  : note.description}{" "}
              </p>
              {/* ------- action btns --------- */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  className="link text-secondary text-sm hover:text-cyan-600 transition-colors"
                  onClick={() =>
                    document
                      .getElementById(`modal_note_${note._id}`)
                      .showModal()
                  }>
                  view details
                </button>
                <p className="text-sm text-gray-500">
                  • {new Date(note.created_at).toLocaleDateString()} •
                </p>
                <button
                  onClick={() => handleNoteDelete(note._id)}
                  className="p-1 border border-transparent hover:border-red-600 text-red-600 rounded hover:-translate-y-1 transition-all">
                  <FaTrashAlt />
                </button>
              </div>

              <NoteModal note={note} />
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
          <p className="text-center">No notes currently available.</p>
        </div>
      )}
    </section>
  );
}

export default Notes;
