"use client"
import { useState } from 'react'
import Swal from 'sweetalert2'
import { FaStar } from "react-icons/fa";

// dummy user
const user = {
  authorName: "ali",
  authorEmail: "ali@mail.com",
  authorPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
}

function AddReviewForm() {

  // handler: add course
  const handleAddCourse = async (e) => {
    e.preventDefault()

    const formData = {
      rating: e.target.rating.value,
      review_text: e.target.review_text.value.trim(),
      authorName: user.authorName,
      authorEmail: user.authorEmail,
      authorPhotoUrl: user.authorPhotoUrl,
      publish_date: Date.now()
    }

    try {
      // req: add new review >>
      // await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/add-course", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json"
      //   },
      //   body: JSON.stringify(formData)
      // })

      // reset form and show alert
      // e.target.reset()
      console.log(formData);

      Swal.fire({
        title: "Successfully added the review!",
        icon: "success",
        confirmButtonColor: "#15803D"
      })
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        title: "Error on adding review!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C"
      })
    }
  }

  return (
    <div>
      <header className="mb-2">
        <h2 className="text-xl md:text-2xl font-semibold">Give your review:</h2>
      </header>

      <form onSubmit={handleAddCourse} className="max-w-lg. mx-auto">
        <label className="form-control mb-3">
          <div className="label">
            <span className="label-text">Review text:</span>
          </div>
          <textarea name="review_text" className="textarea textarea-bordered h-24" placeholder="your course description" required></textarea>
        </label>

        <div className="flex items-end gap-4 justify-between">
          <div className="mb-3 text-2xl" >
            <div className="label">
              <span className="label-text">Your Rating:</span>
            </div>

            <div className="flex gap-3">
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <button className="btn btn-primary mt-4">Add Review</button>

        </div>
      </form>
    </div>

  );
}

export default AddReviewForm;