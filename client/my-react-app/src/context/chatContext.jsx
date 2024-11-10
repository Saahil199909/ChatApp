import { createContext, useContext, useEffect, useState } from "react";
import { baseurl, getApi, postApi } from "../utils/services";
import { AuthContext } from "./AuthContext";
// import { Socket } from "socket.io-client";

export const chatContext = createContext();

export const ChatContextProvider = ({children}) => {

    const {user} = useContext(AuthContext)
    const [listusers, setListUsers] = useState(null)
    const [showChatBox, setShowChatBox] = useState(false)
    const [selectedUserToChat, setSelectedUserToChat] = useState(null)
    const [chatId, setChatId] = useState(null)
    const [getAllMessages, setGetAllMessages] = useState(null)
    const [message, setMessage] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const getAllusers = async() => {
        const response = await getApi(`${baseurl}/users/`)
        if (response.error){
        }else{
            setListUsers(response.data)
        }
    }

    const funcShowChatBoxx = async (selectedUser) => {
        const response = await postApi(`${baseurl}/chat/createChat/${selectedUser._id}/${user._id}`)
        if (response.error){
            console.log(response.error)
        }else{
            setChatId(response.data)
        }
        const getAllMessagesResponse = await getApi(`${baseurl}/chat/getAllMessages/${response.data._id}`)
        if(getAllMessagesResponse.error){
            console.log(getAllMessagesResponse.error)
        }else{
            setGetAllMessages(getAllMessagesResponse.data)
        }
        setSelectedUserToChat(selectedUser)
        setShowChatBox(true)
    }


    const sendmessage = async(chatId, senderId, message, socket) => {
        const chatIdValue = chatId._id
        const recipientIdList = chatId.members.filter(memberId => memberId !== senderId)
        const recipientId = recipientIdList[0]
        const response = await postApi(`${baseurl}/chat/createMessage`, {chatIdValue, senderId, message})
        if(response.error){
            console.log(response.error)
        }else{
            setMessage('')
            socket.emit('serverPrivateMessage', {recipientId, message: response.data})
        }
    } 

    const updatemessage = (info) => {
        setMessage(info)
    }

    return(
        <chatContext.Provider value={{
            showChatBox,
            listusers,
            selectedUserToChat,
            getAllMessages,
            chatId,
            message,
            setGetAllMessages,
            getAllusers,
            funcShowChatBoxx,
            sendmessage,
            updatemessage
        }}>
            {children}
        </chatContext.Provider>
    )
}   