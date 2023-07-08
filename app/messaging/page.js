"use client"

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {io} from "socket.io-client";
import pfp from "../../public/person.png"
import { Avatar } from "@chakra-ui/react";
import axios from "axios";

//TODO: message notifs and connection status

export default function Message() {
    const scrollBottom = useRef();
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedMsgHistory, setSelectedMsgHistory] = useState(null)
    const [allChats, setAllChats] = useState([])
    const [ableToMsg, setAbleToMsg] = useState([])
    //have an array state that holds if connected users are actually connected to the server(online)
    //have an array state that holds new messages
    const [hasNewMsg, setHasNewMsg] = useState([]);
    const [selectedUser, setSelectedUser] = useState([])
    const { data: session } = useSession();
    const user = (session) ? session.user : "";
    const socket = io(process.env.BASE_URL, { 
        auth: { 
            email: user.email,
            username: user.firstName + " " + user.lastName,
        },
        id: user._id
    });

    socket.connect();

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    socket.on("private message", ({content, from, fromUser}) => {
        console.log("hi")
        if(from === user._id) return;
        const receiverId = (user.role === "student") ? selectedChat.coachId : selectedChat.studentId;
        if (from === receiverId) {
            return;
        }
        const newMsg = {
            sender: fromUser,
            content: content,
            send_date: Date.now()
        }
        setSelectedMsgHistory([...selectedMsgHistory, newMsg])
    })

    //gets all users that the current user can chat to
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const r = await fetch(`${process.env.SERVER_URI}subscribe/getSubscriptions/${user._id.toString()}`)
                const response = await r.json();
                setAllChats((prev) => response)
            } catch(e) {
                console.error(e)
            }
        };
        const fetchSubscribers = async () => {
            try {
                const r = await fetch(`${process.env.SERVER_URI}subscribe/getSubscribers/${user._id.toString()}`)
                const response = await r.json();
                setAllChats((prev) => response)
            } catch(e) {
                console.error(e)
            }
        };
        if (user.role === "student") fetchSubscriptions();
        else fetchSubscribers();
    },[user])

    //gets all chat's user schemas
    useEffect(() => {
        const getUser = async() => {
            console.log(allChats.length)
            let newArr = []
            for await (const chats of allChats.map(chat => fetch(`${process.env.SERVER_URI}api/account/${(user.role === "student") ? chat.coachId : chat.studentId}`))) {
                const u = await chats.json()
                console.log(u)
                newArr = [...newArr, u]
            }
            setAbleToMsg(prev => newArr)
        }
        getUser();
    }, [allChats, user.role])


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(message == "") return;

        setSelectedMsgHistory([...selectedMsgHistory, {
            sender: user.firstName + " " + user.lastName,
            content: message,
            send_date: Date.now()
        }])

        try {
            const addMsg = await fetch(`${process.env.SERVER_URI}subscribe/addMessage`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify({
                    sender: user.firstName + " " + user.lastName,
                    content: message,
                    id: selectedChat._id
                })
            })
            // console.log(addMsg.data)
        } catch(err) {
            console.log(err)
        }

        socket.emit("private message", {
            content: message,
            to: (user.role === "student") ? selectedChat.coachId : selectedChat.studentId,
        });

        setMessage("");
    }

    //changing selecting of chats
    const handleChangeChat = (i) => {
        setSelectedChat(allChats[i])
        setSelectedMsgHistory(allChats[i].message_history)
    }

    //scrolls to bottom for every sent chat
    useEffect(() => {
        scrollBottom?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [selectedMsgHistory])

  return (
    <div
    className="pt-16 h-screen w-screen overflow-hidden"
    >
        <div
        className="w-full h-full flex flex-row overflow-hidden border-t-2 border-black"
        >
            <div
            className="h-full w-1/4 bg-white overflow-auto border-x-2 border-black"
            >
                <div
                className="h-16 flex justify-center align-middle text-black text-4xl font-extrabold border-black p-4"
                >
                    Recent Messages
                </div>
                {(ableToMsg.length > 0) ? (ableToMsg.map((user, idx) => (
                    <button
                    className={"h-20 w-full p-2 hover:bg-slate-300 text-lg font-bold border-black flex items-center " + 
                    ((selectedChat && selectedChat._id === allChats[idx]._id) ? " bg-slate-300" : "")}
                    key={idx}
                    onClick={() => handleChangeChat(idx)}
                    >
                        <Avatar src={pfp} size="sm" margin={2}/>
                        {user.firstName + " " + user.lastName}
                    </button>
                ))): (
                    <div
                    className="h-20 w-full p-2 text-xl font-semibold text-center text-red-500"
                    >
                        No Messages
                    </div>
                )}
            </div>


            <div
            className="h-full w-3/4 bg-slate-400 flex-col-reverse flex"
            >
                {selectedChat && (<div
                className="w-full flex-row"
                >
                    <input
                        name="message"
                        placeholder="enter your message"
                        value={message}
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-2 border-slate-400 p-2 ml-16 mb-8 rounded-lg w-10/12"
                    />
                    <button
                    className="bg-black text-white rounded-lg p-2 m-2 w-20 font-bold"
                    onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>)}
                <div
                className="mx-8 my-6 h-5/6 p-2 bg-slate-100 overflow-auto text-5xl font-bold"
                >
                    {(selectedMsgHistory) ? (
                        selectedMsgHistory.map((msg, idx) => (
                            <div
                            key={idx}
                            className="w-full px-4"
                            >   
                                {((idx - 1) < 0 || selectedMsgHistory[idx-1].sender != msg.sender) ? 
                                (<div
                                className="font-extrabold text-xl mt-4"
                                >
                                    {msg.sender}
                                </div>) : 
                                null}
                                <div
                                className="px-4 font-semibold text-base mt-1"
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))
                    ) :
                    "You must select a chat"}
                    <div
                    ref={scrollBottom}
                    />
                </div>
            </div>
        </div>
    </div>
    
  );
};

