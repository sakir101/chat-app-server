"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: 'Full name is required'
        }),
        role: zod_1.z.string({
            required_error: 'Role is required'
        }),
        email: zod_1.z.string({
            required_error: 'Email is required'
        }),
        password: zod_1.z.string({
            required_error: 'Password is required'
        })
    })
});
exports.UserValidation = {
    createUserZodSchema,
};
