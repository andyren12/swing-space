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

const UploadToCourseButton = ({ listCourses, setListCourses }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [course, setCourse] = useState();
  const [section, setSection] = useState();
  const [sectionName, setSectionName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const fetchCourses = async () => {
    const coachID = listCourses[0].coachID; // replace with actual coachID
    try {
      const response = await axios.get(
        "http://localhost:3001/coach-dashboard/get-courses",
        {
          params: {
            coachID: coachID,
          },
        }
      );
      setListCourses(response.data);
    } catch (error) {
      console.error(error.response.data); // Assuming that an error message is returned in the response body
    }
  };

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

  const handleSectionNameChange = (e) => {
    setSectionName(e.target.value);
  };

  const addSectionHandler = async () => {
    const coachID = listCourses[0].coachID; // replace with actual coachID
    console.log(course);
    try {
      const response = await axios.post(
        "http://localhost:3001/coachprofile/create/section",
        {
          coachID: coachID,
          courseID: course,
          sectionTitle: sectionName,
        }
      );
      if (response.status === 200) {
        console.log(response.data); // Logs the updated list of sections

        // If the section was successfully added (i.e., the server responded with a 200 status),
        // then fetch the updated list of courses.
        fetchCourses();
      } else {
        // If the server responded with a status other than 200,
        // then the section was not successfully added and we shouldn't fetch the courses.
        console.error("Failed to add section");
      }
      console.log(response.data); // Logs the updated list of sections
    } catch (error) {
      console.error(error.response.data); // Assuming that an error message is returned in the response body
    }
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
    formData.append("id", session.user._id.toString());
    formData.append("courseName", course);
    formData.append("sectionName", section);

    const response = await axios.post(
      "http://localhost:3001/coachprofile/upload/video",
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

          <Button onClick={addSectionHandler}>Add a Section</Button>
          <Input
            type="text"
            placeholder="enter new section title"
            onChange={handleSectionNameChange}
          />

          <Input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UploadToCourseButton;
