const chatModel = require('../Models/chatModel')
const messageModel = require('../Models/messageModel')

const createOrGetChat = async(req, res) => {
    try{
        const {firstId, secondId} = req.params
        const chatObj = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        }) 
        if(chatObj){
            return res.status(200).json(chatObj)
        }else{
            const createchatobj = new chatModel({members: [firstId, secondId]})
            await createchatobj.save()
            return res.status(200).json(createchatobj)
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const createMessage = async(req, res) => {
    try{
        const {chatId, senderId, message} = req.body
        if (!chatId || !senderId || !message){
            return res.status(400).json({ error: 'chatId, senderId, and message are required fields' })
        }
        const createMessageObj = new messageModel({chatId: chatId, senderId: senderId, message: message})
        await createMessageObj.save()
        return res.status(200).json({"msg":"message send succesfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

const getAllMessages = async(req, res) => {
    try{
        const {chatId} = req.params
        const getMessageObjs = await messageModel.find({chatId})
        return res.status(200).json(getMessageObjs)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {createOrGetChat, createMessage, getAllMessages}


