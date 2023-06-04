import { Box, Button, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadToCourseButton from "./UploadToCourseButton";
import CreateCourseButton from "./CreateCourseButton";
import VideoList from "../GeneralDashboard/VideoList";

const CoachProfilePage = () => {
  const [listCourses, setListCourses] = useState([]);
  const fetchCourses = async () => {
    const coachID = "647678a8ef4004ca0f573214"; // replace with actual coachID
    try {
      const response = await axios.get(
        "http://localhost:3001/coachprofile/courses",
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

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Box>
      {/* <Heading>My Courses</Heading>
      <CreateCourseButton fetchCourses={fetchCourses} />
      <UploadToCourseButton listCourses={listCourses} /> */}
      <VideoList listCourses={listCourses} />
      {/* <SimpleGrid columns={3} spacing={5}>
        {listCourses.map((course, index) => (
          <Link key={index}>{course.name}</Link>
        ))}
      </SimpleGrid> */}
    </Box>
  );
};

export default CoachProfilePage;
