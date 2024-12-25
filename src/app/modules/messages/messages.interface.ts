import { Model, Types } from "mongoose";

export interface IMessage {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    text: string;
}

export type MessageModel = Model<IMessage, Record<string, unknown>>;
