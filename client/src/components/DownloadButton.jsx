// DownloadButton.js

import React, { useState } from "react";

const DownloadButton = ({ fileUrl, fileName ,filekey }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredKey, setEnteredKey] = useState("");

  const handleDownload = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleKeySubmit = () => {
    if (enteredKey == filekey) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download=fileName
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsModalOpen(false); 
    } else {
      alert("Incorrect key. Please try again.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Download
      </button>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-8 rounded shadow-md z-10">
            <span
              onClick={handleModalClose}
              className="absolute top-4 right-4 cursor-pointer text-gray-600"
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Enter Key</h2>
            <input
              type="password"
              placeholder="Enter key"
              value={enteredKey}
              onChange={(e) => setEnteredKey(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <button
              onClick={handleKeySubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
