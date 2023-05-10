"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/api/login", {
          username,
          password,
        })
        .then((res) => {
          if (res.data.user) {
            console.log(res.data);
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // push("/");
          } else {
            console.log("No user found!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      console.log(loggedInUser);
    }
  }, []);

  if (user) {
    console.log(user);
    return <div>{user.name} is logged in</div>;
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
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
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
