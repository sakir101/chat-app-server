import { Schema, model } from "mongoose";
import { MessageModel, IMessage } from "./messages.interface";


const messageSchema = new Schema<IMessage>(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const MessageList = model<IMessage, MessageModel>('MessageList', messageSchema);
