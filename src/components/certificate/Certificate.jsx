import React from "react";

const Certificate = ({ userName, courseName, duration, provider }) => {
  return (
    <div
      id="pdf-content"
      className="certificate-container flex flex-col items-center justify-center h-full p-10 bg-gray-50 border border-gray-300 rounded-lg shadow-lg"
    >
      <div className="certificate-header text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Certificate of Completion
        </h1>
        <p className="text-lg mt-2 text-gray-600">This is to certify that</p>
      </div>

      <div className="certificate-body text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          {userName}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          has successfully completed the course:
        </p>
        <h3 className="text-2xl font-medium text-blue-700 mt-4">
          {courseName}
        </h3>
        <div className="mt-6">
          <p className="text-lg">
            <strong>Duration:</strong> {duration}
          </p>
          <p className="text-lg">
            <strong>Provider:</strong> {provider}
          </p>
        </div>
      </div>

      <div className="certificate-footer text-center mt-10">
        <p className="text-sm text-gray-500">Issued by Learnica</p>
        <p className="text-sm text-gray-500 mt-2">
          Date: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Certificate;
