import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const CreateCourseButton = (props) => {
  const [title, setTitle] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createCourseHandler = async () => {
    // const formData = new FormData();
    // formData.append("courseName", title);
    // formData.append("coachID", session.user.user._id.toString());
    // formData.append("email", session.user.email);

    onClose();

    const response = await axios.post(
      "http://localhost:3001/coach-dashboard/create-course",
      {
        coachID: session.user.user._id.toString(),
        courseName: title,
      }
    );

    if (response.status === 200) {
      // Refetch the courses after successful course creation
      props.fetchCourses();
    }

    // fetch("/upload/file", {
    //   method: "POST",
    //   body: formData,
    // });
  };

  return (
    <>
      <Button onClick={onOpen}>Create a Course</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Course</ModalHeader>
          <ModalCloseButton />
          <Input
            type="text"
            onChange={handleTitleChange}
            placeholder="Course Title"
          />
          <Button onClick={createCourseHandler}>Create a Course</Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCourseButton;
