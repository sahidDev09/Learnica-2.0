"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { user } = useUser();

  const [user_name, setUser_name] = useState(user?.fullName);
  const certificate_details = {
    courseName: "Complete Web Development with Jhanker Mahbub",
    duration: "270 h",
    provider: "Programming Hero",
  };

  const generatePDF = async () => {
    try {
      const input = document.getElementById("pdf-content");

      if (!input) {
        console.error("Element with id 'pdf-content' not found.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${user_name}_Certificate.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-2 mb-10">
      <div className="lg:w-4/12 p-2">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="p-2 font-medium text-gray-500 text-xl">
            Please make sure your name is right or you can change it.
          </h2>
          <div>
            <span>Your Name : </span>
            <input
              className="input input-bordered grow"
              type="text"
              defaultValue={user?.fullName}
              placeholder="Your name"
              onChange={(e) => setUser_name(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="lg:w-8/12 p-2 my-4">
        <div
          id="pdf-content"
          className="certificate-container flex flex-col items-center justify-center h-full p-10 bg-gray-50 border border-gray-300 rounded-lg shadow-lg"
        >
          <div className="certificate-header text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">
              Certificate of Completion
            </h1>
            <p className="text-lg mt-2 text-gray-600">
              This is to certify that
            </p>
          </div>

          <div className="certificate-body text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">
              {user_name}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              has successfully completed the course:
            </p>
            <h3 className="text-2xl font-medium text-blue-700 mt-4">
              {certificate_details.courseName}
            </h3>
            <div className="mt-6">
              <p className="text-lg">
                <strong>Duration:</strong> {certificate_details.duration}
              </p>
              <p className="text-lg">
                <strong>Provider:</strong> {certificate_details.provider}
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
        <div className="flex justify-center py-2">
          <button className="btn bg-green-500 text-white" onClick={generatePDF}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
