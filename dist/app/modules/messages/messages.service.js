"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = require("../users/users.model");
const messages_model_1 = require("./messages.model");
const server_1 = require("../../../server");
const fetchUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find({ _id: { $ne: id } });
    if (!users || users.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No users found');
    }
    return users;
});
const getMessages = (id, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messages_model_1.MessageList.find({
            $or: [
                { senderId: id, receiverId: receiverId },
                { senderId: receiverId, receiverId: id }
            ]
        });
        return messages;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw new Error('Failed to fetch messages');
    }
});
const sendMessage = (text, id, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Text:", text, "Sender ID:", id, "Receiver ID:", receiverId); // Debug log
        if (!receiverId) {
            throw new Error("Receiver ID is required");
        }
        const newMessage = new messages_model_1.MessageList({
            text,
            senderId: id,
            receiverId, // Ensure this is correctly passed
        });
        yield newMessage.save();
        const receiverSocketId = (0, server_1.getReceiverSocketId)(receiverId);
        console.log("Receiver Socket ID:", receiverSocketId);
        if (receiverSocketId) {
            server_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return newMessage;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to send message");
    }
});
exports.MessageService = {
    fetchUsers,
    getMessages,
    sendMessage
};
