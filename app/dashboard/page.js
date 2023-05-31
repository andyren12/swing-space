"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div>Dashboard</div>
      <div>{session?.user?.email}</div>
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
