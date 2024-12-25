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
exports.USerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = require("./users.model");
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById({ _id: id });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    return user;
});
const fetchAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find();
    if (!users) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No users found');
    }
    return users;
});
exports.USerService = {
    getUserById,
    fetchAllUsers
};
