import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Certificate from "./Certificate";

const CertificateButton = () => {
  const certificate_details = {
    userName: "Abdul Mazed",
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
      pdf.save(`${certificate_details.userName}_Certificate.pdf`);

      document.getElementById("my_modal_5").close();
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div>
      <button
        className="btn bg-primary text-white p-2 rounded-md"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Certificate
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <Certificate {...certificate_details} />

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-primary text-white">Cancel</button>
            </form>
            <button
              className="btn bg-green-500 text-white"
              onClick={generatePDF}
            >
              Download
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CertificateButton;
