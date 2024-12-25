"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormValidation = void 0;
const zod_1 = require("zod");
const createFormZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        formName: zod_1.z.string({
            required_error: "Form name is required",
        }),
        fieldNumber: zod_1.z.number({
            required_error: "Field number is required",
        }),
        fieldLabel: zod_1.z.array(zod_1.z.string(), {
            required_error: "Field label is required",
        }),
        fieldType: zod_1.z.array(zod_1.z.string(), {
            required_error: "Field type is required",
        }),
    }),
});
exports.FormValidation = {
    createFormZodSchema
};
