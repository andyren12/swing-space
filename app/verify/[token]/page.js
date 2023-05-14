"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Verify({ params }) {
  const { token } = params;
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    async function verifyEmailToken() {
      const response = await axios.post(
        `http://localhost:3001/api/verify/${token}`,
        {
          emailToken: token,
        }
      );
      if (response) {
        console.log(response);
        if (response.status === 200) {
          setIsValidToken(true);
        }
      }
    }
    verifyEmailToken();
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
