import { Box, Tab, Tabs, TabList } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const VideoList = () => {
  const [listVideos, setListVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const coachID = "647678a8ef4004ca0f573214"; // replace with actual coachID
      const courseName = "Course 1";
      try {
        const response = await axios.get(
          "http://localhost:3001/coach-dashboard/get-videos",
          {
            params: {
              coachID: coachID,
              courseName: courseName,
            },
          }
        );
        console.log(response.data);
        setListVideos(response.data);
      } catch (error) {
        console.log(response);
        // console.error(error.response.data); // Assuming that an error message is returned in the response body
      }
    };
    fetchVideos();
  }, []);
  return (
    <Box display="flex" justifyContent="center">
      <Tabs>
        <TabList>
          {listVideos.map((video, index) => (
            <Tab key={index}>{video.videoTitle}</Tab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
};

export default VideoList;
