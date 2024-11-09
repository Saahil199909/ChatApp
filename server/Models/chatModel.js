const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        members: {
            type: [String],
            required: true,
            validate: [arrayLimit, 'Members array must contain exactly two members'] // Custom validation
        }
    },
    {
        timestamps: true
    }
);

// Custom validation to ensure the array has exactly two members
function arrayLimit(val) {
    return val.length === 2;
}

const chatModel = mongoose.model('Chat', chatSchema)

module.exports = chatModel