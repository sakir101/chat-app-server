import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { USerService } from "./users.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./users.interface";
import httpStatus from "http-status";

const getUserById = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await USerService.getUserById(id)

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single User retrived successfully',
            data: result,
        });
    }
)

const fetchAllUsers = catchAsync(
    async (req: Request, res: Response) => {

        const result = await USerService.fetchAllUsers()

        sendResponse<IUser[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Users retrived successfully',
            data: result,
        });
    }
)

export const UserController = {
    getUserById,
    fetchAllUsers
}