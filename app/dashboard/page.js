"use client";

import CreateCourseButton from "@/components/CoachPage/CreateCourseButton";
import CreateSubscriptionButton from "@/components/CoachPage/CreateSubscriptionButton";
import UploadToCourseButton from "@/components/CoachPage/UploadToCourseButton";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const [listCourses, setListCourses] = useState([]);

  const fetchCourses = async () => {
    const coachID = session?.user._id;
    try {
      const response = await axios.get(
        "http://localhost:3001/coachprofile/courses",
        {
          params: {
            coachID,
          },
        }
      );
      setListCourses(response.data);
    } catch (error) {
      console.error(error); // Assuming that an error message is returned in the response body
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "coach")
      fetchCourses();
  }, [session?.user?._id, status]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-16">
      <div>Dashboard</div>
      {session?.user.role === "coach" && (
        <Box>
          <CreateCourseButton fetchCourses={fetchCourses} />
          <UploadToCourseButton
            listCourses={listCourses}
            setListCourses={setListCourses}
          />
          <CreateSubscriptionButton />
          {listCourses.map((course, index) => (
            <Box key={index}>
              {course.name}
              <Box>
                {" "}
                {course.sections.map((section, index) => (
                  <Box key={index}>{section.name}</Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <button
        onClick={() => {
          push("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
}
