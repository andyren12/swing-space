"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let session = useSession();
  const { push } = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (data?.user) {
        session = useSession();
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (session?.status === "authenticated") {
    return (
      <div>
        <div>{session.data?.user.email} is logged in</div>
        <button onClick={signOut}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "20px",
        }}
        action="POST"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <input type="submit" />
      </form>
      <button onClick={signOut}>Logout</button>
      <button
        onClick={() => {
          push("/");
        }}
      >
        Back
      </button>
    </div>
  );
}
