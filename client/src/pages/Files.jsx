// Files.js

import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { getFilesSuccess } from "../redux/features/fileSlice";
import DownloadButton from "../components/DownloadButton";

const Files = () => {
  const { files, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = user.currentUser.token;
  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/files/get-all", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const files = await res.json();
      dispatch(getFilesSuccess(files));
    } catch (error) {}
  };

  const handleDownload = (id) => {
    // Implement download logic here
    console.log(`Downloading file with ID ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/files/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          
        },
      });

      getFiles();
    } catch (error) {}
  };
  return (
    <div className="p-10">
      <FileUpload />
      <div className="container mx-auto mt-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Files</h2>
        {files &&
          files?.files?.map((file, index) => (
            <div
              key={file._id}
              className="bg-white p-4 rounded-md shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-8">
                <p className="text-lg font-semibold">
                  file{index + 1}.{file.format}
                </p>
                <p className="text-gray-500">ID: {file.uniqueKey_6_digit}</p>
              </div>
              <div className="flex gap-4">
                {/* <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDownload(file.id)}
                >
                  Download
                </button> */}
                <DownloadButton
                  fileUrl={file.url}
                  fileName={`file${index + 1}.${file.format}`}
                  filekey={file.uniqueKey_6_digit}
                />
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(file._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Files;
