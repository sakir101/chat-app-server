import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { MessageService } from "./messages.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../users/users.interface";
import { IMessage } from "./messages.interface";

const fetchUsers = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await MessageService.fetchUsers(id)

        sendResponse<IUser[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Users retrived successfully',
            data: result,
        });
    }
)

const getMessages = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const receiverId = req.params.receiverId;
        const result = await MessageService.getMessages(id, receiverId);

        sendResponse<IMessage[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Messages retrieved successfully',
            data: result,
        });
    }
);

const sendMessage = catchAsync(
    async (req: Request, res: Response) => {
        const { text } = req.body;
        const id = req.params.id;
        const receiverId = req.params.receiverId;

        const result = await MessageService.sendMessage(text, id, receiverId);

        sendResponse<IMessage>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Messages retrieved successfully',
            data: result,
        });
    }
);

export const MessageController = {
    fetchUsers,
    getMessages,
    sendMessage
}
