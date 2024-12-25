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
exports.QuizService = void 0;
const quiz_model_1 = require("./quiz.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createQuiz = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quiz_model_1.Question.create(question);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create quiz');
    }
    return result;
});
const fetchAllQuizzes = () => __awaiter(void 0, void 0, void 0, function* () {
    const quizzes = yield quiz_model_1.Question.find();
    if (!quizzes) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No quizzes found');
    }
    return quizzes;
});
const deleteQuiz = (quizId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quiz_model_1.Question.findByIdAndDelete(quizId);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Quiz not found');
    }
    return result;
});
const updateQuiz = (quizId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quiz_model_1.Question.findByIdAndUpdate(quizId, updatedData, { new: true, runValidators: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Quiz not found');
    }
    return result;
});
const getQuizByQuizId = (quizId) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_model_1.Question.findOne({ quizId: quizId });
    if (!quiz) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Quiz not found');
    }
    return quiz;
});
const getQuizById = (quizId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(quizId);
    const quiz = yield quiz_model_1.Question.findById({ _id: quizId });
    if (!quiz) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Quiz not found');
    }
    return quiz;
});
exports.QuizService = {
    createQuiz,
    fetchAllQuizzes,
    deleteQuiz,
    updateQuiz,
    getQuizByQuizId,
    getQuizById
};
