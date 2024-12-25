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
exports.AuthService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const users_model_1 = require("../users/users.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    if (user.role === 'user') {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const newUser = yield users_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
            newUserAllData = newUser[0];
            yield session.commitTransaction();
        }
        catch (error) {
            yield session.abortTransaction();
            throw error;
        }
        finally {
            yield session.endSession();
        }
    }
    return newUserAllData;
});
const createAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    if (user.role === 'admin') {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const newUser = yield users_model_1.User.create([user], { session });
            if (!newUser.length) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
            newUserAllData = newUser[0];
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
    }
    return newUserAllData;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    try {
        const user = yield users_model_1.User.findOne({ email });
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        else {
            const id = user === null || user === void 0 ? void 0 : user._id.toString();
            const isUserExist = yield users_model_1.User.isUserExist(id);
            if (!isUserExist) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
            }
            // Match password
            if (isUserExist.password &&
                !(yield users_model_1.User.isPasswordMatched(password, isUserExist.password))) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
            }
            const { _id: userId, role } = isUserExist;
            let accessToken = "";
            if (role === user_1.ENUM_USER_ROLE.ADMIN) {
                accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.admin_secret, config_1.default.jwt.expires_in);
            }
            if (role === user_1.ENUM_USER_ROLE.USER) {
                accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.user_secret, config_1.default.jwt.expires_in);
            }
            return { accessToken };
        }
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Email not found");
    }
});
exports.AuthService = {
    createUser,
    createAdmin,
    loginUser
};
