import mongoose from "mongoose"
import { IUser } from "../users/users.interface"
import { User } from "../users/users.model"
import ApiError from "../../../errors/ApiError"
import httpStatus from "http-status"
import { ILoginUser } from "./auth.interface"
import { ENUM_USER_ROLE } from "../../../enums/user"
import { jwtHelpers } from "../../../helpers/jwtHelpers"
import config from "../../../config"
import { Secret } from "jsonwebtoken"

const createUser = async (user: IUser): Promise<IUser | null> => {
    let newUserAllData = null;
    if (user.role === 'user') {

        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const newUser = await User.create([user], { session });

            if (!newUser.length) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
            }

            newUserAllData = newUser[0];
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }
    return newUserAllData;
};


const createAdmin = async (user: IUser): Promise<IUser | null> => {



    let newUserAllData = null
    if (user.role === 'admin') {

        const session = await mongoose.startSession()
        try {
            session.startTransaction()

            const newUser = await User.create([user], { session });


            if (!newUser.length) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
            }

            newUserAllData = newUser[0];
            await session.commitTransaction();
            await session.endSession();

        } catch (error) {
            await session.abortTransaction();
            await session.endSession()
            throw error;
        }
    }
    return newUserAllData
}

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;


    try {
        const user = await User.findOne({ email });

        if (!user) {

            throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
        }
        else {
            const id = user?._id.toString();

            const isUserExist = await User.isUserExist(id)


            if (!isUserExist) {
                throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
            }

            // Match password

            if (
                isUserExist.password &&
                !await User.isPasswordMatched(password, isUserExist.password)
            ) {

                throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
            }
            const { _id: userId, role } = isUserExist
            let accessToken = ""

            if (role === ENUM_USER_ROLE.ADMIN) {

                accessToken = jwtHelpers.createToken(
                    { userId, role },
                    config.jwt.admin_secret as Secret,
                    config.jwt.expires_in as string
                )



            }

            if (role === ENUM_USER_ROLE.USER) {

                accessToken = jwtHelpers.createToken(
                    { userId, role },
                    config.jwt.user_secret as Secret,
                    config.jwt.expires_in as string
                )



            }

            return { accessToken }


        }



    } catch (error) {

        throw new ApiError(httpStatus.NOT_FOUND, "Email not found");
    }



}


export const AuthService = {
    createUser,
    createAdmin,
    loginUser
}
