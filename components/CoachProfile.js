import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";

const CoachProfile = ({ id }) => {
  const { data: session, update } = useSession();
  const handleSubscribe = async () => {
    const res = await axios.post(
      `${process.env.SERVER_URI}api/subscribe/${id}`,
      {
        id: session?.user._id.toString(),
      }
    );
    if (res) {
      console.log(res);
      update();
    }
  };

  const handleUnsubscribe = async () => {
    console.log(session);
    const res = await axios.post(
      `${process.env.SERVER_URI}api/unsubscribe/${id}`,
      {
        id: session?.user._id.toString(),
      }
    );
    if (res) {
      console.log(res);
      update();
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
