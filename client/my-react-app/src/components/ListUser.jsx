import React, { useContext, useEffect, useState } from "react";
import { chatContext } from "../context/chatContext";

export default function ListUser({
  user,
  onClick,
  isLoggedIn,
  typingSenderId,
  senderNotificationCount,
}) {

  const [showNotificationCountCircle, setShowNotificationCountCircle] = useState(false)

  useEffect(() => {
    if(senderNotificationCount === 0){
      setShowNotificationCountCircle(false)
    }else{
      setShowNotificationCountCircle(true)
    }
  })

  return (
    <div
      className="flex justify-between border-b border-white cursor-pointer pt-6"
      onClick={onClick}
    >
      <div className="flex flex-col justify-end pb-2">
        <p className="text-xl font-semibold">{user.name}</p>
        <p className="text-gray-400">
          {user._id === typingSenderId ? "Typing...." : "Text Message"}
        </p>
      </div>

      <div className="pb-1">
        <p>
          <i
            className={`fa-solid fa-circle ${
              isLoggedIn ? "text-green-600" : "text-gray-600"
            } text-xs ml-20`}
          ></i>
        </p>
        <p className="text-gray-400">12/12/2024</p>
        <p>
          {showNotificationCountCircle ? (
            <i className="fa-solid fa-circle text-blue-300 ml-16 text-2xl relative">
            <span
              className="absolute top-1.5 text-black text-sm"
              style={{ left: "0.5rem" }}
            >
              {senderNotificationCount}
            </span>
          </i>
          ): ''}
        </p>
      </div>
    </div>
  );
}
