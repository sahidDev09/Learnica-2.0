"use client";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

// req: add new note >>
const addNote = async (formData) => {
  const res = await fetch("/api/my-notes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

function AddNoteForm({ courseId, handleLockedBuyBtn, isEnrolled }) {
  const queryClient = useQueryClient();
  const user = useUser();
  const userEmail = user?.user?.emailAddresses[0]?.emailAddress;

  const mutation = useMutation({
    mutationFn: addNote,
  });

  // handler: add course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    // check enrollment
    if (!isEnrolled) {
      handleLockedBuyBtn()
      return
    }

    const formData = {
      title: e.target.title.value.trim(),
      description: e.target.description.value.trim(),
      email: userEmail,
      created_at: Date.now(),
      courseId,
    };

    // no email alert
    if (!formData.email) {
      alert("you must log in!");
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["my-notes", courseId]);
        // reset form and show alert
        e.target.reset();
        Swal.fire({
          title: "Successfully added the note!",
          icon: "success",
          confirmButtonColor: "#15803D",
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on adding note!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#B91C1C",
        });
      },
    });
  };

  return (
    <div>
      <header className="mb-3">
        <h2 className="text-xl md:text-2xl font-semibold">Add your note:</h2>
      </header>

      <form onSubmit={handleAddCourse} className="mx-auto">
        <label className="form-control mb-3 border rounded-md bg-card">
          <input
            type="text"
            name="title"
            placeholder="Note title"
            className="w-full min-w-0 text-lg font-semibold bg-transparent px-4 py-2 outline-none border-b border-gray-300"
            required
          />
          <textarea
            name="description"
            className="w-full min-w-0 h-48 bg-transparent px-4 py-2 outline-none resize-none placeholder:text-italic"
            placeholder="Write what you wanna save in the note"
            required></textarea>

          <div className="p-2">
            <Button type="submit" className="bg-secondary">
              Add note
            </Button>
          </div>
        </label>
      </form>
    </div>
  );
}

export default AddNoteForm;
