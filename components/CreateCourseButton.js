import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button, Input } from "@chakra-ui/react";

const CreateCourseButton = () => {
  const [title, setTitle] = useState("");
  const { data: session } = useSession();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createCourseHandler = async () => {
    const formData = new FormData();
    formData.append("title", title);
    // formData.append("email", session.user.email);

    const response = await axios.post(
      "http://localhost:3001/upload/file",
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
      <Input type="text" onChange={handleTitleChange}>
        Course Title
      </Input>
      <Button onClick={createCourseHandler}>Create a Course</Button>
    </>
  );
};

export default CreateCourseButton;
