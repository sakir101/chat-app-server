import { z } from "zod";


const createFormZodSchema = z.object({
    body: z.object({
        formName: z.string({
            required_error: "Form name is required",
        }),
        fieldNumber: z.number({
            required_error: "Field number is required",
        }),
        fieldLabel: z.array(z.string(), {
            required_error: "Field label is required",
        }),
        fieldType: z.array(z.string(), {
            required_error: "Field type is required",
        }),
    }),
});

export const FormValidation = {
    createFormZodSchema
}