import AddForm from "./AddForm";
import NewCourse from "./New-course/NewCourse";

function AddCourse() {
  return (
    <section>
      <NewCourse />
      {/* <div className="max-w-screen-xl mx-auto">
        <header className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Add New Course</h2>
        </header>

        <AddForm />
      </div> */}
    </section>
  );
}

export default AddCourse;
