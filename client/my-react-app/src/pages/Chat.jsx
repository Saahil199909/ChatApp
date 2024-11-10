import React, { useContext, useEffect, useState, useRef } from "react";
import ListUser from "../components/ListUser";
import { chatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";

export default function Chat() {
  const {
    getAllusers,
    listusers,
    showChatBox,
    funcShowChatBoxx,
    selectedUserToChat,
    getAllMessages,
    setGetAllMessages,
    sendmessage,
    chatId,
    message,
    updatemessage
  } = useContext(chatContext);
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    getAllusers();

    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket.id); // socket.id is the unique identifier for the connection
    });

    socket.emit("join", user._id);

    socket.on("clientPrivateMessage", ({ message }) => {
      setGetAllMessages((prevMessages) => [...prevMessages, message]);
    });

    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.disconnect();
    };
  }, [getAllMessages]);

  return (
    <div className="flex gap-16 m-8 h-full overflow-hidden">
      <div className="flex justify-center sm:justify-end w-full sm:w-1/3">
        <div className="w-3/4 h-18">
          {listusers &&
            listusers.map(
              (listuser) =>
                user._id !== listuser._id && (
                  <ListUser
                    key={listuser._id}
                    user={listuser}
                    onClick={() => funcShowChatBoxx(listuser)}
                  />
                )
            )}
        </div>
      </div>

      {showChatBox ? (
        <div className="hidden sm:flex flex-col justify-between w-2/3 bg-black border border-black rounded-md">
          <header className="bg-gray-800 w-full py-2 text-center text-xl font-semibold">
            {selectedUserToChat.name}
          </header>

          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col gap-2 p-2">
              {getAllMessages &&
                getAllMessages.map((message) => (
                  <p
                    className={`${
                      message.senderId === user._id
                        ? "bg-green-800"
                        : "bg-gray-600"
                    } border rounded-md ${
                      message.senderId === user._id
                        ? "border-green-800"
                        : "border-gray-800"
                    } whitespace-pre-line max-w-fit p-2 ${
                      message.senderId === user._id ? "self-end" : "self-start"
                    }`}
                  >
                    {message.message}
                  </p>
                ))}
              {/* Empty div to act as the scroll target */}
              <div ref={messageEndRef} />
            </div>
          </div>

          <footer className="flex w-full bg-gray-800 py-4">
            <textarea
              className="w-5/6 pl-4 border rounded-lg mx-10 text-black font-semibold overflow-hidden h-10 pt-1"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => updatemessage(e.target.value)}
            ></textarea>
            <p>
              <i
                className="fa-solid fa-paper-plane text-4xl cursor-pointer"
                onClick={() =>
                  sendmessage(chatId, user._id, message, socketRef.current)
                }
              ></i>
            </p>
            <p></p>
          </footer>
        </div>
      ) : (
        <p className="text-xl font-bold text-center w-2/3">
          You have no active conversation....
        </p>
      )}
    </div>
  );
}
