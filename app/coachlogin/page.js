"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let session = useSession();
  const { push } = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
        role: "coach",
      });

      switch (data.status) {
        case 401: {
          setMessage("Your username or password is incorrect");
          break;
        }
        case 200: {
          push("/dashboard");
          break;
        }
        default:
      }
      if (data?.user) {
        session = useSession();
      }
    } catch (err) {
      console.log(err);
    }
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
      <button onClick={signOut}>Log out</button>
      <div>{message}</div>
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
