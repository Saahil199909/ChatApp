const express = require('express');
const {createOrGetChat, createMessage, getAllMessages} = require('../Controllers/chatController')


const router = express.Router();

router.post('/createChat/:firstId/:secondId', createOrGetChat)
router.post('/createMessage', createMessage)
router.get('/getAllMessages/:chatId', getAllMessages)


module.exports = router