"use client";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";

// // dummy user
const userinfo = {
  authorName: "ali",
  authorEmail: "ali@mail.com",
  authorPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
};

function AddForm() {
  const { user } = useUser();

  // handler: add course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value.trim(),
      price: +e.target.price.value.trim(),
      userId: user.id,
      duration: e.target.duration.value.trim(),
      description: e.target.description.value.trim(),
      authorName: userinfo.authorName,
      authorEmail: userinfo.authorEmail,
      authorPhotoUrl: userinfo.authorPhotoUrl,
      publish_date: Date.now(),
    };

    try {
      // host image into imagebb >>
      const imgFormData = new FormData();
      imgFormData.append("image", e.target.thumbnail.files[0]);

      const resp = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        {
          method: "POST",
          body: imgFormData,
        }
      );
      const result = await resp.json();
      const thumbnail = result.data.display_url;
      formData.thumbnail = thumbnail;

      // req: add new course >>
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/add-course", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // reset form and show alert
      e.target.reset();
      Swal.fire({
        title: "Successfully added the course!",
        icon: "success",
        confirmButtonColor: "#15803D",
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: "Error on adding course!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#B91C1C",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleAddCourse} className="max-w-lg mx-auto">
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Course title:</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="e.g Javascript 101"
            className="input input-bordered w-full min-w-0"
            required
          />
        </label>

        <div className="flex gap-4">
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">Course Price (taka):</span>
            </div>
            <input
              type="text"
              name="price"
              placeholder="e.g 300"
              className="input input-bordered w-full min-w-0"
              required
            />
          </label>

          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">Course duration (months):</span>
            </div>
            <input
              type="text"
              name="duration"
              placeholder="e.g 5"
              className="input input-bordered w-full min-w-0"
              required
            />
          </label>
        </div>

        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Course thumbnail:</span>
          </div>
          <input
            type="file"
            name="thumbnail"
            className="file-input file-input-bordered w-full min-w-0"
          />
        </label>

        <label className="form-control mb-3">
          <div className="label">
            <span className="label-text">Course Description:</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered h-24"
            placeholder="your course description"
            required></textarea>
        </label>

        <button className="btn btn-primary mt-4">Add Course</button>
      </form>
    </div>
  );
}

export default AddForm;
