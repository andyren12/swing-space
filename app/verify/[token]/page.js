"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Verify({ params }) {
  const { token } = params;
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      const response = await axios.post(
        `${process.env.SERVER_URI}api/verify/${token}`
      );

      if (response) {
        if (response.status === 200) {
          setIsValidToken(true);
        }
      }
    }
    verifyToken();
  }, [token]);

  return (
    <div>
      {isValidToken ? (
        <div>Email has been verified </div>
      ) : (
        <div>Could not verify email </div>
      )}
    </div>
  );
}
