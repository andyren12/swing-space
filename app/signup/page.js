"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/register", {
        name,
        email,
        phone,
        password,
      });
      if (res.data) {
        console.log(res.data);
        push("/");
      } else {
        console.log("bad");
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
            setName(e.target.value);
          }}
          placeholder="name"
        />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <input
          type="text"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="phone"
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
    </div>
  );
}
