"use client";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

// req: add new review >>
const addComment = async (formData) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/add-review",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  return res.json();
};

function AddReviewForm() {
  const queryClient = useQueryClient();
  const userData = useUser()
  const user = {
    authorEmail: userData?.user.emailAddresses[0].emailAddress,
    authorName: userData?.user.fullName,
    authorPhotoUrl: userData?.user.imageUrl
  } 

  const mutation = useMutation({
    mutationFn: addComment,
  });

  // handler: add course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    const formData = {
      rating: +e.target.rating.value,
      review_text: e.target.review_text.value.trim(),
      reviewerName: user.authorName,
      reviewerEmail: user.authorEmail,
      reviewerPhotoUrl: user.authorPhotoUrl,
      created_at: Date.now(),
    };

    // check user info
    if (!(user.authorEmail && user.authorName)) {
      alert('you must login!')
      return;
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["course-reviews"]);
        // reset form and show alert
        e.target.reset();
        Swal.fire({
          title: "Successfully added the review!",
          icon: "success",
          confirmButtonColor: "#15803D",
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Error on adding review!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#B91C1C",
        });
      },
    });
  };

  return (
    <div>
      <header className="mb-2">
        <h2 className="text-xl md:text-2xl font-semibold">Give your review:</h2>
      </header>

      <form onSubmit={handleAddCourse} className="mx-auto">
        <label className="form-control mb-3">
          <div className="label">
            <span className="label-text">Review text:</span>
          </div>
          <textarea
            name="review_text"
            className="textarea textarea-bordered h-24"
            placeholder="your course description"
            required></textarea>
        </label>

        <div className="flex md:items-end gap-2 justify-between flex-col md:flex-row md:gap-4">
          {/* ------ star rating ---------- */}
          <div className="mb-3 text-2xl">
            <div className="label">
              <span className="label-text">Your Rating:</span>
            </div>
            <div className="rating rating-lg rating-half">
              <input
                type="radio"
                name="rating"
                value={0.5}
                className="mask mask-star-2 mask-half-1 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={1}
                className="mask mask-star-2 mask-half-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={1.5}
                className="mask mask-star-2 mask-half-1 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={2}
                className="mask mask-star-2 mask-half-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={2.5}
                className="mask mask-star-2 mask-half-1 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={3}
                className="mask mask-star-2 mask-half-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={3.5}
                className="mask mask-star-2 mask-half-1 bg-yellow-500"
                defaultChecked
              />
              <input
                type="radio"
                name="rating"
                value={4}
                className="mask mask-star-2 mask-half-2 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={4.5}
                className="mask mask-star-2 mask-half-1 bg-yellow-500"
              />
              <input
                type="radio"
                name="rating"
                value={5}
                className="mask mask-star-2 mask-half-2 bg-yellow-500"
              />
            </div>
          </div>

          <Button className="bg-secondary">Add Review</Button>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
