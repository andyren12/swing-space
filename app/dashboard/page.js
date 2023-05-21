"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { push } = useRouter();
  let session = useSession();
  let arr = [];
  if (session?.data) {
    arr = Object.entries(session.data.user);
  }
  return (
    <div>
      Dashboard
      {arr.map((entry, index) => {
        return (
          <div key={index}>
            {entry[0]}: {entry[1]}
          </div>
        );
      })}
      <button
        onClick={() => {
          push("/");
        }}
      >
        Home
      </button>
    </div>
  );
}
