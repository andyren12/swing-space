"use client";

import { Heading, Flex, Box, Checkbox, Text, VStack } from "@chakra-ui/react";
import react, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

export default function page({ params }) {
  const [currentCourse, setCurrentCourse] = useState({});
  const [currentVideo, setCurrentVideo] = useState("");
  const { id } = params;
  const fetchCourse = async () => {
    const courseID = id;
    try {
      const response = await axios.get(
        "http://localhost:3001/coach-dashboard/get-course",
        {
          params: {
            courseID: courseID,
          },
        }
      );
      setCurrentCourse(response.data);
      if (
        response.data.sections &&
        response.data.sections[0] &&
        response.data.sections[0].videos &&
        response.data.sections[0].videos[0]
      ) {
        setCurrentVideo(response.data.sections[0].videos[0].videoPath);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const changeVideoHandler = (e) => {
    setCurrentVideo(e.target.getAttribute("value"));
  };

  return (
    <div>
      Course {id}
      <Heading>{`Course Name: ` + currentCourse.name}</Heading>
      <Flex>
        <Box>
          {currentCourse.sections && (
            <ReactPlayer
              url={`https://d1edznew70prql.cloudfront.net/` + currentVideo}
              controls={true}
            />
          )}
        </Box>
        <Box>
          <VStack>
            {currentCourse.sections &&
              currentCourse.sections.map((section, index) => (
                <Box key={index}>
                  <Text key={`title` + index} as="b" fontSize="xlg">
                    {section.sectionTitle}
                  </Text>
                  {section.videos.map((video, index) => (
                    <Box key={`video` + index} display="flex">
                      <Text
                        key={`vidTitle` + index}
                        value={video.videoPath}
                        cursor="pointer"
                        onClick={changeVideoHandler}
                      >
                        {video.videoTitle}
                      </Text>
                      <Checkbox key={`isWatched` + index}>Watched</Checkbox>
                    </Box>
                  ))}
                </Box>
              ))}
          </VStack>
        </Box>
      </Flex>
    </div>
  );
}
