"use client";

import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const { push } = useRouter();
  return (
    <main className="flex justify-center">
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
