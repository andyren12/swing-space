"use client";

import CoachProfile from "@/components/CoachProfile";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Profile({ params }) {
  const { id } = params;
  const [account, setAccount] = useState(null);
  const { data: session, status } = useSession();

  const [videos, setVideos] = useState([]);

  const stripePromise = loadStripe(
    "pk_test_51NPxlTDQn4uWUTWnck5F2nlYOQT2dTP5kIVzzGZbxLHMR8gcLAzZ3mipRFaqhof3wakQ3oRb6DMjJZ67JFLlshSa00PpkKVXKL"
  );

  useEffect(() => {
    const getAccount = async () => {
      const res = await axios.get(`${process.env.SERVER_URI}api/account/${id}`);
      setAccount(res.data);
    };

    getAccount();
  }, [id, status, session?.user?._id]);

  let arr = [];
  if (account) {
    arr = Object.entries(account.user);
  }

  return (
    <Elements stripe={stripePromise}>
      <Box className="p-16">
        {!account && "No coach found"}
        {arr.map((entry, index) => {
          if (Array.isArray(entry[1])) {
            return;
          }
          return (
            <div key={index}>
              {entry[0]}: {entry[1]}
            </div>
          );
        })}
        {account?.user.role === "coach" && (
          <CoachProfile id={account.user._id.toString()} />
        )}
      </Box>
    </Elements>
  );
}
