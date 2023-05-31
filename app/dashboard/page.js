"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { push } = useRouter();
  const { data: session } = useSession();
  let arr = [];
  if (session) {
    arr = Object.entries(session?.user);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div>Dashboard</div>
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
      <button
        onClick={() => {
          signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
}
