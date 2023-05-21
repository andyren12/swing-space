"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <main>
      <button
        onClick={() => {
          push("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          push("/signup");
        }}
      >
        Sign up
      </button>
      <button
        onClick={() => {
          push("/coachsignup");
        }}
      >
        Coach sign up
      </button>
      <button
        onClick={() => {
          push("/dashboard");
        }}
      >
        Dashboard
      </button>
    </main>
  );
}
