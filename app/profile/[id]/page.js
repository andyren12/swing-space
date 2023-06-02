"use client";

import UserProfile from "@/components/UserProfile";
import CoachProfile from "@/components/CoachProfile";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Profile({ params }) {
  const { id } = params;
  const [account, setAccount] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getAccount = async () => {
      const res = await axios.get(`${process.env.SERVER_URI}api/get/${id}`);
      setAccount(res.data);
    };

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

    getAccount();
  }, [id, status, session?.user?._id]);

  let arr = [];
  if (account) {
    arr = Object.entries(account.user);
  }

  return (
    <Box>
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
      {subscribed && "Boobs"}
    </Box>
  );
}