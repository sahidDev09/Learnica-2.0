"use client"
// dummy user
const user = {  
  authorName: "ali",
  authorEmail: "ali@mail.com",
  authorPhotoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
}

function AddForm() {

  // handler: add course
  const handleAddCourse = async (e) => {
    e.preventDefault()

    const formData = {
      title: e.target.title.value.trim(),
      price: +e.target.price.value.trim(),
      duration: e.target.duration.value.trim(),
      thumbnail: e.target.thumbnail.value.trim(),
      description: e.target.description.value.trim(),
      authorName: user.authorName,
      authorEmail: user.authorEmail,
      authorPhotoUrl: user.authorPhotoUrl,
      publish_date: Date.now() 
    }

    try {
      // send post req
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/add-course", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      e.target.reset()
      alert('successfully added data')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleAddCourse} className="max-w-lg mx-auto">
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Course title:</span>
          </div>
          <input type="text" name="title" placeholder="e.g Javascript 101" className="input input-bordered w-full min-w-0" required />
        </label>

        <div className="flex gap-4">
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">Course Price (taka):</span>
            </div>
            <input type="text" name="price" placeholder="e.g 300" className="input input-bordered w-full min-w-0" required />
          </label>

          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">Course duration (months):</span>
            </div>
            <input type="text" name="duration" placeholder="e.g 5" className="input input-bordered w-full min-w-0" required />
          </label>
        </div>

        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Course thumbnail (url):</span>
          </div>
          <input type="text" name="thumbnail" placeholder="e.g https://imagebb.com/flower.png" className="input input-bordered w-full min-w-0" required />
        </label>

        <label className="form-control mb-3">
          <div className="label">
            <span className="label-text">Course Description:</span>
          </div>
          <textarea name="description" className="textarea textarea-bordered h-24" placeholder="your course description" required></textarea>
        </label>

        <button className="btn btn-primary mt-4">Add Course</button>
      </form>
    </div>

  );
}

export default AddForm;