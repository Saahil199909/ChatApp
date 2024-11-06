import React, { useContext, useEffect, useState } from "react";
import ListUser from "../components/ListUser";
import { chatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";

export default function Chat() {
  const { getAllusers, listusers, showChatBox, funcShowChatBoxx, selectedUserToChat} = useContext(chatContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className="flex gap-16 m-8 h-full overflow-hidden">
      <div className="flex justify-center sm:justify-end w-full sm:w-1/3">
        <div className="w-3/4 h-18">
          {listusers &&
            listusers.map(
              (listuser) =>
                user._id !== listuser._id && (
                  <ListUser key={listuser._id} user={listuser} onClick={() => funcShowChatBoxx(listuser)} />
                )
            )}
        </div>
      </div>

      {
        showChatBox ? 
        (<div className="hidden sm:flex flex-col justify-between w-2/3 bg-black border border-black rounded-md">
        <header className="bg-gray-800 w-full py-2 text-center text-xl font-semibold">
          {selectedUserToChat.name}
        </header>

        <div className="flex-grow overflow-y-auto"></div>

        <footer className="flex w-full bg-gray-800 py-4">
          <textarea
            className="w-3/4 pl-4 border rounded-lg mx-10 text-black font-semibold overflow-hidden h-10 pt-1"
            placeholder="Type your message here"
          ></textarea>
          <p> <i class="fa-regular fa-message-arrow-up-right"></i> </p>
          <p>wew</p>
        </footer>
      </div>) : (<p className="text-xl font-bold text-center w-2/3"> You have no active conversation....</p>)
      }
    </div>
  );
}
