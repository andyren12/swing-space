"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = await axios.post(`${process.env.SERVER_URI}api/register`, {
        firstName,
        lastName,
        email,
        password,
        role: "student",
      });
      if (user?.data?.message === "User already exists") {
        setUserExists(true);
      } else {
        console.log(user.data);
        push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "20px",
        }}
        action="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder="first name"
        />
        <input
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="last name"
        />
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
      <div>{userExists ? "A user with this email already exists!" : ""}</div>
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
