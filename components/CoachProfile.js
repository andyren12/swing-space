import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";

const CoachProfile = ({ id }) => {
  const { data: session } = useSession();
  const handleSubscribe = async () => {
    const res = await axios.post(`${process.env.SERVER_URI}subscribe/add`, {
      coachId: id,
      studentId: session?.user._id.toString(),
    });
    if (res) {
      window.location.reload();
    }
  };

  const handleUnsubscribe = async () => {
    console.log(session);
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

  return (
    <Box>
      Coach Profile
      <Button onClick={handleSubscribe}>Subscribe</Button>
      <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
    </Box>
  );
};

export default CoachProfile;
