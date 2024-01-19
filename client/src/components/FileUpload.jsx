import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../redux/features/fileSlice";
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const disptach = useDispatch()
  const { user } = useSelector((state) => state);
  const token = user.currentUser?.token;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected for upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      
      const data = await response.json();
       disptach(addFile(data.file))

      setLoading(false);
      console.log("File uploaded successfully:", data);
    } catch (error) {
      setLoading(false);
    
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">File Upload</h2>
      <div className="flex items-center gap-4">
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="border border-gray-300 p-2"
        />
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {selectedFile && (
        <p className="mt-4">
          Selected File: <strong>{selectedFile.name}</strong>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
