const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const messageModel = mongoose.model('Message', messageSchema)

module.exports = messageModel