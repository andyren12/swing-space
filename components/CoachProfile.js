import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";

const CoachProfile = ({ id }) => {
  const { data: session, status } = useSession();
  const [subscribed, setSubscribed] = useState(false);
  const [profile, setProfile] = useState();
  const [courses, setCourses] = useState([]);
  const { push } = useRouter();

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

      const getProfile = async () => {
        const res = await axios.get(
          `${process.env.SERVER_URI}coachprofile/get`,
          {
            params: {
              coachID: id,
            },
          }
        );

        setProfile(res.data.coachProfile);
      };
      getSubscription();
      getProfile();
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
      {profile?.subscriptions?.map((subscription, index) => (
        <SubscriptionCard
          key={index}
          name={subscription.name}
          coachId={id}
          studentId={session?.user._id.toString()}
          priceId={subscription.priceID}
          connectedAcctId={profile.stripeId}
        />
      ))}
      {subscribed && (
        <Box>
          Subscribed
          {courses.map((course, index) => (
            <Box
              key={index}
              onClick={() => push(`/course/${course._id.toString()}`)}
            >
              {course.name}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CoachProfile;
