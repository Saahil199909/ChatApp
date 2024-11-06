import React, { useContext } from "react";
import { chatContext } from "../context/chatContext";

export default function ListUser({user, onClick}) {

    // const {showChatBoxx} = useContext(chatContext)
    
  return (
    <div className="flex justify-between border-b border-white cursor-pointer" onClick={onClick}>
      <div className="flex flex-col justify-end pb-2">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-gray-400">Text Message</p>
      </div>

      <div className="pb-1">
        <p>
          <i className="fa-solid fa-circle text-green-600 text-xs ml-20" ></i>
        </p>
        <p className="text-gray-400">12/12/2024</p>
        <p>
        <i className="fa-solid fa-circle text-blue-300 ml-16" ></i>
        </p>
      </div>
    </div>
  );
}
