"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const OptionSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});
const QuestionSchema = new mongoose_1.Schema({
    questionText: { type: String, required: true },
    quizId: { type: Number, required: true, unique: true },
    options: { type: [OptionSchema], required: true, validate: [arrayLimit, '{PATH} exceeds the limit of 4'] },
    timeLimit: { type: Number, required: true }
});
function arrayLimit(val) {
    return val.length === 4;
}
exports.Question = (0, mongoose_1.model)("Question", QuestionSchema);
