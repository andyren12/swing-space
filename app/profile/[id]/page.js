"use client";

import CoachProfile from "@/components/CoachProfile";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Profile({ params }) {
  const { id } = params;
  const [account, setAccount] = useState(null);
  const { data: session, status } = useSession();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getAccount = async () => {
      const res = await axios.get(`${process.env.SERVER_URI}api/account/${id}`);
      setAccount(res.data);
    };

    getAccount();
  }, [id, status, session?.user?._id]);

  return (
    <Box className="p-16">
      {!account && "No coach found"}
      {account?.user.firstName} {account?.user.lastName}
      {account?.user.role === "coach" && (
        <CoachProfile id={account.user._id.toString()} />
      )}
    </Box>
  );
}
