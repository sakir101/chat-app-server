import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../users/users.interface";
import { User } from "../users/users.model";
import { IMessage } from "./messages.interface";
import { MessageList } from "./messages.model";
import { getReceiverSocketId, io } from "../../../server";

const fetchUsers = async (id: string): Promise<IUser[]> => {
    const users = await User.find({ _id: { $ne: id } });
    if (!users || users.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
    }
    return users;
};

const getMessages = async (id: string, receiverId: string): Promise<IMessage[]> => {
    try {
        const messages = await MessageList.find({
            $or: [
                { senderId: id, receiverId: receiverId },
                { senderId: receiverId, receiverId: id }
            ]
        });

        return messages;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw new Error('Failed to fetch messages');
    }
};

const sendMessage = async (text: string, id: string, receiverId: string): Promise<IMessage> => {
    try {
        console.log("Text:", text, "Sender ID:", id, "Receiver ID:", receiverId); // Debug log

        if (!receiverId) {
            throw new Error("Receiver ID is required");
        }

        const newMessage = new MessageList({
            text,
            senderId: id, // Use correct field name for sender ID
            receiverId,    // Ensure this is correctly passed
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("Receiver Socket ID:", receiverSocketId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return newMessage;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send message");
    }
}

export const MessageService = {
    fetchUsers,
    getMessages,
    sendMessage
}