import { Box, Tab, Tabs, TabList, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const VideoList = ({ listCourses }) => {
  const [listVideos, setListVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const coachID = "647678a8ef4004ca0f573214"; // replace with actual coachID

      if (listCourses.length > 0) {
        const courseName = listCourses[0].name;
        try {
          const response = await axios.get(
            "http://localhost:3001/coachprofile/videos",
            {
              params: {
                coachID: coachID,
                courseName: courseName,
              },
            }
          );
          setListVideos(response.data);
        } catch (error) {
          console.log(response);
          // console.error(error.response.data); // Assuming that an error message is returned in the response body
        }
      }
    };
    fetchVideos();
  }, [listCourses]);
  return (
    <Box display="flex" justifyContent="center">
      <Tabs>
        <TabList>
          {listVideos.map((video, index) => (
            <Box key={index}>
              <Tab key={`title-` + index}>{video.videoTitle}</Tab>
              <Checkbox key={`isWatched` + index}>Watched</Checkbox>
            </Box>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
};

export default VideoList;
