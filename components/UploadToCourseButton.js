import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const UploadToCourseButton = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const { data: session } = useSession();

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
    formData.append("id", session.user.user._id.toString());
    const response = await axios.post(
      "http://localhost:3001/coach-dashboard/upload-video",
      formData
    );

    // fetch("/upload/file", {
    //   method: "POST",
    //   body: formData,
    // });
    if (response.data.message === "success") {
      alert("File uploaded successfully");
    } else {
      alert("File upload failed");
    }
  };
  return (
    <>
      <Input type="text" onChange={handleNameChange} />
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </>
  );
};

export default UploadToCourseButton;
