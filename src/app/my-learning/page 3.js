import MyLearning from "./MyLearning";

function MyLearingPage() {
  return (  
    <div className="px-4">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-secondary">My Learning</h1>

        <MyLearning />
      </div>
    </div>
  );
}

export default MyLearingPage;