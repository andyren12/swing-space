import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CoachProfile = ({ id }) => {
  const { data: session, status } = useSession();
  const [subscribed, setSubscribed] = useState(false);
  const [courses, setCourses] = useState([]);
  const { push } = useRouter();

  const handleSubscribe = async () => {
    const subscription = await axios.post(
      `${process.env.SERVER_URI}subscribe/add`,
      {
        coachId: id,
        studentId: session?.user._id.toString(),
        priceId: "price_1NUxO2DBy5zW5a87ftcszkq6",
        connectedAcctId: "acct_1NUxKFDBy5zW5a87",
      }
    );
    console.log(subscription.data);
    window.location = subscription.data.session.url;
  };

  const handleUnsubscribe = async () => {
    const res = await axios.delete(
      `${process.env.SERVER_URI}subscribe/remove`,
      {
        params: {
          studentId: session?.user._id.toString(),
          coachId: id,
        },
      }
    );
    if (res) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const getSubscription = async () => {
        const res = await axios.get(`${process.env.SERVER_URI}subscribe/get`, {
          params: {
            coachId: id,
            studentId: session.user._id.toString(),
          },
        });
        if (res.data.subscription) {
          setSubscribed(true);
        }
      };
      getSubscription();
    }

    if (subscribed) {
      const getCourses = async () => {
        const res = await axios.get(
          `${process.env.SERVER_URI}coachprofile/courses`,
          {
            params: {
              coachID: id,
            },
          }
        );

        if (res) {
          setCourses(res.data);
        }
      };
      getCourses();
    }
  }, [id, session?.user?._id, status, subscribed]);

  return (
    <Box>
      Coach Profile
      <Button onClick={handleSubscribe}>Subscribe</Button>
      <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
      {subscribed &&
        courses.map((course, index) => (
          <Box
            key={index}
            onClick={() => push(`/course/${course._id.toString()}`)}
          >
            {course.name}
          </Box>
        ))}
    </Box>
  );
};

export default CoachProfile;
