"use client";

import { useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", fileName);

    const response = await axios.post(
      "http://localhost:3001/upload/file",
      formData
    );

    // fetch("/upload/file", {
    //   method: "POST",
    //   body: formData,
    // });

    if (response.ok) {
      alert("File uploaded successfully");
    } else {
      alert("File upload failed");
    }
  };

  return (
    <div>
      <input type="text" onChange={handleNameChange} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
