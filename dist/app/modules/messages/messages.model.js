"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageList = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    text: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.MessageList = (0, mongoose_1.model)('MessageList', messageSchema);
