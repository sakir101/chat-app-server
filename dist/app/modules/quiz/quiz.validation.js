"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizValidation = void 0;
const zod_1 = require("zod");
const optionSchema = zod_1.z.object({
    text: zod_1.z.string({
        required_error: "Option text is required",
    }),
    isCorrect: zod_1.z.boolean({
        required_error: "isCorrect field is required",
    }),
});
const questionSchema = zod_1.z.object({
    body: zod_1.z.object({
        questionText: zod_1.z.string({
            required_error: "Question text is required",
        }),
        quizId: zod_1.z.number({
            required_error: "Quiz ID is required",
        }),
        options: zod_1.z.array(optionSchema)
            .length(4, { message: "Exactly 4 options are required" }),
        timeLimit: zod_1.z.number({
            required_error: "Time limit is required",
        }).positive({
            message: "Time limit must be a positive number",
        }),
    })
});
const createQuizZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        questions: zod_1.z.array(questionSchema, {
            required_error: "Questions are required",
        }).min(1, { message: "At least one question is required" }),
    }),
});
exports.QuizValidation = {
    questionSchema
};
