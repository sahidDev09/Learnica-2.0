import Info from "./Info";

function Statistics() {
  return (  
    <div className="container mx-auto p-10">
      <div className="mb-8 animate-[fadeInDown_0.6s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-3">
          Instructor Statistics
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor your teaching performance and course engagement
        </p>
      </div>
      <Info />
    </div>
  );
}

export default Statistics;