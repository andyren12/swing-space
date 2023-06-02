import {
  Box,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UploadToCourseButton = ({ listCourses }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [course, setCourse] = useState();
  const [section, setSection] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    onClose();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", fileName);
    formData.append("id", session.user.user._id.toString());
    formData.append("courseName", course);
    formData.append("sectionName", section);

    const response = await axios.post(
      "http://localhost:3001/coach-dashboard/upload-video",
      formData
    );

    if (response) console.log(response);

    // fetch("/upload/file", {
    //   method: "POST",
    //   body: formData,
    // });
    if (response.status === 200) {
      alert("File uploaded successfully");
    } else {
      alert("File upload failed");
    }
  };
  return (
    <Box>
      <Button onClick={onOpen}>Add a Video</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Video</ModalHeader>
          <ModalCloseButton />
          <Input
            type="text"
            placeholder="enter video title"
            onChange={handleNameChange}
          />
          <Select placeholder="Select Course" onChange={handleCourseChange}>
            {listCourses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option> //have to check if you need toString for id
            ))}
          </Select>
          <Select placeholder="Select Section" onChange={handleSectionChange}>
            {listCourses.map((course, index) =>
              course.sections.map((section, index) => (
                <option key={index} value={section.sectionTitle}>
                  {section.sectionTitle}
                </option>
              ))
            )}
          </Select>
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UploadToCourseButton;
