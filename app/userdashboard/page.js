"use client";
import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import UploadButton from "@/components/UploadButton";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";
import axios from "axios";

const page = () => {
  const [listCourses, setListCourses] = useState([]);
  const { data: session } = useSession();
  let arr = [];
  if (session) {
    arr = session.user.subscriptions;
  }

  useEffect(() => {
    const fetchFilePaths = async () => {
      try {
        const response = await axios.post(
          `${process.env.SERVER_URI}api/getCoachID`,
          {
            ids: arr,
          }
        );
        // const response = await axios.get(`${process.env.SERVER_URI}api/getCoachID`)

        if (response) {
          setListCourses(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (session) {
      fetchFilePaths();
    }
  }, [session]);

  console.log(arr);
  return (
    <Box textAlign="center">
      <Heading>Your Videos</Heading>
      <UploadButton />
      {listCourses.map((videoID, index) => (
        <ReactPlayer
          key={index}
          url={`https://d1edznew70prql.cloudfront.net/` + videoID}
          controls={true}
        />
      ))}
    </Box>
  );
};

export default page;
