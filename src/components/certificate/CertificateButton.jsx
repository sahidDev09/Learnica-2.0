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

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    if (input) {
      html2canvas(input)
        .then(() => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
          pdf.save(`${certificate_details.userName}_Certificate.pdf`);

          document.getElementById("my_modal_5").close();
        })
        .catch((error) => {
          console.error("PDF generation error:", error);
        });
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
