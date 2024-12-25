import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { IUser } from "../users/users.interface";
import { ILoginUserResponse } from "./auth.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {


    const { ...userData } = req.body
    const result = await AuthService.createUser(userData)



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result,
    });
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {


    const { ...userData } = req.body
    const result = await AuthService.createAdmin(userData)



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully',
        data: result,
    });
})


const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData)

    const { ...others } = result;
    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully',
        data: others
    })
})

export const AuthController = {
    createUser,
    createAdmin,
    loginUser
}