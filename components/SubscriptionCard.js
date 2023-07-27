import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

const SubscriptionCard = ({
  name,
  coachId,
  studentId,
  priceId,
  connectedAcctId,
}) => {
  const handleSubscribe = async () => {
    const subscription = await axios.post(
      `${process.env.SERVER_URI}subscribe/add`,
      {
        coachId,
        studentId,
        priceId,
        connectedAcctId,
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

  return (
    <Box>
      <Box>{name}</Box>
      <Button onClick={handleSubscribe}>Subscribe</Button>
      <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
    </Box>
  );
};

export default SubscriptionCard;
