"use client"

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import pfp from "../../public/person.png"
import { Avatar } from "@chakra-ui/react";
import axios from "axios";

let socket;

export default function Message() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);


  useEffect(() => {
    try {
        const response = axios.get(`${process.env.SERVER_URI}api/getAccount`)
    } catch(e) {
        console.error(e)
    }
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("emitted");


    setMessage("");
  }

  const users = [
    {
        firstName: "Bach Ngo",
        email: "bach@ucla.edu"
    },
    {
        firstName: "Franklin Zhu",
        email: "franklin@ucla.edu"
    },
    {
        firstName: "Andy Ren",
        email: "andy@ucla.edu"
    },
]

  return (
    <div
    className="h-screen w-screen flex flex-row overflow-hidden"
    >
        <div
        className="h-screen w-1/4 bg-slate-500 overflow-auto border-r-2 border-black"
        >
            <div
            className="h-16 flex justify-center align-middle text-white text-4xl border-b-4 border-black p-4"
            >
            </div>
            {users.map((user) => (
                <div
                className={"h-20 w-full p-2 hover:bg-slate-600 text-lg font-bold border-black flex items-center"}
                key={user.email}
                // onClick={() => {
                //     selected = "bg-white"
                // }}
                >
                    <Avatar src={pfp} size="sm" margin={2}/>
                    {user.firstName}
                </div>
            ))}
        </div>


        <div
        className="h-full w-full bg-slate-50 flex-col-reverse flex"
        >
            <div
            className="w-full flex-row"
            >
                {/* {
                    message history
                } */}
                <input
                    name="message"
                    placeholder="enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-2 border-slate-400 p-2 ml-16 mb-8 rounded-lg w-5/6"
                />
                <button
                className="bg-black text-white rounded-lg p-2 m-2 w-16"
                onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
        </div>
    </div>
    // <div>
    //   <h1>Chat app</h1>
    //   <h1>Enter a username</h1>

    //   <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />

    //   <br />
    //   <br />

    //   <div>
    //     {allMessages.map(({ username, message }, index) => (
    //       <div key={index}>
    //         {username}: {message}
    //       </div>
    //     ))}

    //     <br />

    //     <form onSubmit={handleSubmit}>
    //       <input
    //         name="message"
    //         placeholder="enter your message"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         autoComplete={"off"}
    //       />
    //     </form>
    //   </div>
    // </div>
  );
};

