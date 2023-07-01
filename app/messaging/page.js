import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Message() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();

    console.log("emitted");


    setMessage("");
  }

  const users = [
    {
        firstName: "bach",
        email: "bach@ucla.edu"
    },
    {
        firstName: "franklin",
        email: "franklin@ucla.edu"
    },
    {
        firstName: "andy",
        email: "andy@ucla.edu"
    },
]

  return (
    <div
    className="h-screen w-screen flex flex-row"
    >
        <div
        className="h-full w-1/4 bg-slate-500 overflow-auto border-2 border-black"
        >
            <div
            className="h-20 flex justify-center align-middle text-white text-4xl border-b-2 border-black p-4"
            >
                Recent Messages
            </div>
            {users.map((user) => (
                <button
                className={"h-20 w-full p-2 pl-6 hover:bg-slate-600 text-left text-lg border-b-2 border-black "}
                key={user.email}
                // onClick={() => {
                //     selected = "bg-white"
                // }}
                >
                    {user.firstName}
                </button>
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
                    // value={message}
                    // onChange={(e) => setMessage(e.target.value)}
                    autoComplete={"off"}
                    className="border-2 border-slate-400 p-2 ml-16 mb-8 rounded-lg w-5/6"
                />
                <button
                    className="bg-black text-white rounded-lg p-2 m-2 w-16"
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

