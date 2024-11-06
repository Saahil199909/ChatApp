import { createContext, useState } from "react";
import { baseurl, getApi } from "../utils/services";

export const chatContext = createContext();

export const ChatContextProvider = ({children}) => {

    const [listusers, setListUsers] = useState(null)
    const [showChatBox, setShowChatBox] = useState(false)
    const [selectedUserToChat, setSelectedUserToChat] = useState(null)

    const getAllusers = async() => {
        const response = await getApi(`${baseurl}/users/`)
        if (response.error){
        }else{
            setListUsers(response.data)
        }
    }

    const funcShowChatBoxx = (selectedUser) => {
        setSelectedUserToChat(selectedUser)
        setShowChatBox(true)
    }

    return(
        <chatContext.Provider value={{
            getAllusers,
            showChatBox,
            listusers,
            funcShowChatBoxx,
            selectedUserToChat
        }}>
            {children}
        </chatContext.Provider>
    )
}