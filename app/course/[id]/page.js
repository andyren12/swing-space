"use client";

import { Heading, Flex, Box, Checkbox, Text, VStack } from "@chakra-ui/react";
import react, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";

export default function page({ params }) {
  const [currentCourse, setCurrentCourse] = useState({});
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentVideoID, setCurrentVideoID] = useState("");
  const [watchedVideos, setWatchedVideos] = useState([]);
  const { data: session, status } = useSession();
  const { id } = params;
  const fetchCourse = async () => {
    const courseID = id;
    try {
      const response = await axios.get(
        "http://localhost:3001/coachprofile/course",
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
        setCurrentVideoID(response.data.sections[0].videos[0]._id);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const addWatchedVideoSession = async () => {
    const userID = session?.user?._id;
    const courseID = id;
    try {
      const response = await axios.put(
        `http://localhost:3001/api/putWatchedVideoSession`,
        {
          userID: userID,
          videoID: currentVideoID,
          courseID: courseID,
        }
      );
      setWatchedVideos((prevWatchedVideos) => [
        ...prevWatchedVideos,
        currentVideoID,
      ]);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const getWatchedVideoSession = async () => {
    const userID = session?.user?._id;
    const courseID = id;
    try {
      const response = await axios.get(
        `http://localhost:3001/api/getWatchedVideosByUserAndCourse`,
        {
          params: {
            userId: userID,
            courseId: courseID,
          },
        }
      );
      setWatchedVideos(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchCourse();
    if (status === "authenticated") {
      getWatchedVideoSession();
    }
  }, [status]);

  const changeVideoHandler = (videoPath, videoID) => {
    setCurrentVideo(videoPath);
    setCurrentVideoID(videoID);
  };

  const finishVideoHandler = () => {
    if (session?.user?._id) {
      addWatchedVideoSession();
    }
  };

  const isVideoWatched = (videoId) => {
    return watchedVideos.includes(videoId);
  };

  return (
    <div className="p-16">
      Course {id}
      <Heading>{`Course Name: ` + currentCourse.name}</Heading>
      <Flex>
        <Box>
          {currentCourse.sections && (
            <ReactPlayer
              url={`https://d1edznew70prql.cloudfront.net/` + currentVideo}
              controls={true}
              onEnded={finishVideoHandler}
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
                        onClick={() =>
                          changeVideoHandler(video.videoPath, video._id)
                        }
                      >
                        {video.videoTitle}
                      </Text>
                      <Checkbox
                        key={`isWatched` + index}
                        isChecked={isVideoWatched(video._id)}
                      >
                        Watched
                      </Checkbox>
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
