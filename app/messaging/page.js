"use client"

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import pfp from "../../public/person.png"
import { Avatar } from "@chakra-ui/react";
import axios from "axios";

const socket = io(process.env.BASE_URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default function Message() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [allChats, setAllChats] = useState([])
  const [connectedUsers, setConnectedUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const { data: session } = useSession();
  const id = session.user._id.toString();
  const role = session.user.role.toString();


  useEffect(() => {
    const fetchSubscriptions = async () => {
        try {
            const r = await fetch(`${process.env.SERVER_URI}subscribe/getSubscriptions/${id.toString()}`)
            const response = await r.json();
            setAllChats((prev) => response)
        } catch(e) {
            console.error(e)
        }
    };
    const fetchSubscribers = async () => {
        try {
            const r = await fetch(`${process.env.SERVER_URI}subscribe/getSubscribers/${id.toString()}`)
            const response = await r.json();
            setAllChats((prev) => response)
        } catch(e) {
            console.error(e)
        }
    };
    if (role === "student") fetchSubscriptions();
    else fetchSubscribers();
  },[role, id])

  useEffect(() => {
    const getUser = async() => {
        console.log(allChats.length)
        let newArr = []
        for await (const chats of allChats.map(chat => fetch(`${process.env.SERVER_URI}api/account/${chat.coachId}`))) {
            const u = await chats.json()
            console.log(u)
            newArr = [...newArr, u]
        }
        setConnectedUsers(prev => newArr)
    }
    getUser();
  }, [allChats])

  useEffect(() => {
    // socket.auth = { id }
    // socket.id = id
    // socket.connect();

    // socket.on("users", (users) => {
    //     users.forEach((user) => {
    //       user.self = user.userID === socket.id;
    //     });
    //     // put the current user first, and then sort by username
    //     this.users = users.sort((a, b) => {
    //       if (a.self) return -1;
    //       if (b.self) return 1;
    //       if (a.username < b.username) return -1;
    //       return a.username > b.username ? 1 : 0;
    //     });
    //   });


    // socket.on("private message", ({ content, from }) => {
    //     for (let i = 0; i < allChats.length; i++) {
    //       const user = this.connected[i];
    //       if (user.userID === from) {
    //         user.messages.push({
    //           content,
    //           fromSelf: false,
    //         });
    //         if (user !== this.selectedUser) {
    //           user.hasNewMessages = true;
    //         }
    //         break;
    //       }
    //     }
    // });



  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedUser) {
        socket.emit("private message", {
          content,
          to: selectedUser.id,
        });
        // selectedUser.messages.push({
        //   content,
        //   fromSelf: true,
        // });
    }

    setMessage("");
  }

  const handleChangeChat = (user) => {
    setSelectedUser(user)
  }

    const users = [
        {
            firstName: "Bach Ngo",
            email: "bach@ucla.edu",
            id: "1",
        },
        {
            firstName: "Franklin Zhu",
            email: "franklin@ucla.edu",
            id: "2"
        },
        {
            firstName: "Andy Ren",
            email: "andy@ucla.edu",
            id: "3"
        },
    ]

  return (
    <div
    className="h-screen w-screen overflow-hidden"
    >
        <div
        className="absolute top-16 w-full h-full flex flex-row overflow-hidden border-t-2 border-black"
        >
            <div
            className="h-full w-1/4 bg-white overflow-auto border-x-2 border-black"
            >
                <div
                className="h-16 flex justify-center align-middle text-black text-4xl border-black p-4"
                >
                    Recent Messages
                </div>
                {/* {console.log(connectedUsers.length)} */}
                {(connectedUsers.length > 0) ? (connectedUsers.map((user, idx) => (
                    <div
                    className={"h-20 w-full p-2 hover:bg-slate-100 text-lg font-bold border-black flex items-center"}
                    key={idx}
                    onClick={() => handleChangeChat(user)}
                    >
                        <Avatar src={pfp} size="sm" margin={2}/>
                        {user.firstName + " " + user.lastName}
                    </div>
                ))): null}
            </div>


            <div
            className="h-full w-3/4 bg-slate-50 flex-col-reverse flex"
            >
                <div
                className="w-full flex-row pb-20"
                >
                    <input
                        name="message"
                        placeholder="enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-2 border-slate-400 p-2 ml-16 mb-8 rounded-lg w-10/12"
                    />
                    <button
                    className="bg-black text-white rounded-lg p-2 m-2 w-16"
                    onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
                <div
                    id="msg-hist"
                    className="mx-16 my-6 h-3/4 p-2"
                    >
                        Message History goes here
                </div>
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

