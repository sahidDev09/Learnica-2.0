import Info from "./Info";

function Statistics() {
  return (  
    <div className="container mx-auto p-10">
      <div className="mb-8 animate-[fadeInDown_0.6s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#135276] via-[#1a6a94] to-[#2180b3] bg-clip-text text-transparent mb-3">
          Dashboard Statistics
        </h1>
        <p className="text-gray-600 text-lg">
          Monitor your platform&apos;s performance and user activity
        </p>
      </div>
      <Info />
    </div>
  );
}

export default Statistics;