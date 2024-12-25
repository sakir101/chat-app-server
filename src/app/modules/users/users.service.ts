import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./users.interface";
import { User } from "./users.model";

const getUserById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById({ _id: id });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
    }
    return user;
};

const fetchAllUsers = async (): Promise<IUser[]> => {
    const users = await User.find();
    if (!users) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
    }
    return users;
};

export const USerService = {
    getUserById,
    fetchAllUsers
}