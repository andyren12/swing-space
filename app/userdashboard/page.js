"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";
import axios from "axios";
import CreateCoachProfileButton from "@/components/CoachPage/CreateCoachProfileButton";
import UploadToCourseButton from "@/components/CoachPage/UploadToCourseButton";
import VideoList from "@/components/GeneralDashboard/VideoList";
import CoachProfilePage from "@/components/CoachPage/CoachProfilePage";

const page = () => {
  const [listCourses, setListCourses] = useState([]);
  const { data: session } = useSession();
  let arr = [];
  if (session) {
    arr = session.user.subscriptions;
  }

  // useEffect(() => {
  //   const fetchFilePaths = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${process.env.SERVER_URI}api/getCoachID`,
  //         {
  //           ids: arr,
  //         }
  //       );
  //       // const response = await axios.get(`${process.env.SERVER_URI}api/getCoachID`)

  //       if (response) {
  //         setListCourses(response.data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   if (session) {
  //     fetchFilePaths();
  //   }
  // }, [session]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const coachID = "647678a8ef4004ca0f573214"; // replace with actual coachID
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/coach-dashboard/get-courses",
  //         {
  //           params: {
  //             coachID: coachID,
  //           },
  //         }
  //       );
  //       setListCourses(response.data);
  //     } catch (error) {
  //       console.error(error.response.data); // Assuming that an error message is returned in the response body
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <Box textAlign="center">
      {/* <Heading>Your Videos</Heading>
      <UploadToCourseButton />
      <CreateCoachProfileButton />
      {listCourses.map((videoID, index) => (
        <>
          <p key={index}>{videoID.name}</p>
          <ReactPlayer
            key={index}
            url={
              `https://d1edznew70prql.cloudfront.net/` +
              videoID.sections[0].videos[0].videoPath
            }
            controls={true}
          />
        </>
      ))} */}
      {/* <VideoList /> */}
      {/* <CoachProfilePage /> */}
    </Box>
  );
};

export default page;
