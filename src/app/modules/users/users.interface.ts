import { Model } from "mongoose";

export type IUserRole = 'user' | 'admin'


export type IUser = {
    fullName: string
    role: IUserRole
    email: string
    password: string
}

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<any>

    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>

} & Model<IUser>

export type IUsersFilters = {
    searchTerm?: string;
}
