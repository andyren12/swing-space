"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const { push } = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const session = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      if (session.data.user.verified) {
        setUser(session.data.user);
        localStorage.setItem("user", JSON.stringify(session.data.user));
      } else {
        console.log("Account is not verified!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser();
  };

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
    return (
      <div>
        <div>{user.firstName} is logged in</div>
        <button onClick={handleLogout}>Log out</button>
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
