const CourseApproveBtn = ({ c_id, c_title }) => {
  const handleApprove = async (id, title) => {
    try {
      const courseId = id;
      const courseTitle = title;

      console.log("--------", courseId, "<--/->", courseTitle, "--------");

      // Send the course approval request to the backend API using fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/approveCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId, courseTitle }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Course approved and notification sent:", data);
      } else {
        console.log(
          "Failed to approve the course. Status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  return (
    <div className="w-7/12 mx-auto ">
      <div className="my-6 bg-yellow-400 rounded-xl p-8">
        <h2 className="text-xl font-medium text-center my-3">
          This is a pending course
        </h2>
        <h2 className="text-lg font-semibold text-center my-3">
          Do you approve it..?
        </h2>
        <div className="flex justify-center mt-5">
          <button
            onClick={() => handleApprove(c_id, c_title)}
            className="btn btn-2xl bg-green-600 text-white border-0">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseApproveBtn;
