import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useSession } from "next-auth/react";

const CreateCoachProfileButton = () => {
  const { data: session } = useSession();
  const createCoachProfileHandler = async () => {
    const response = await axios.post(
      "http://localhost:3001/coach-dashboard/create-profile",
      {
        id: session.user.user._id.toString(),
      }
    );
    if (response.data.message === "User already exists") {
      alert("User Already Exists");
    } else {
      alert("success");
    }
  };
  return (
    <>
      <Button onClick={createCoachProfileHandler}>Create a Profile</Button>
    </>
  );
};

export default CreateCoachProfileButton;
