import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";


const handleZodError = (error: ZodError): IGenericErrorResponse => {
    console.log(error.issues.map(issue => issue.path), 'eta zod error');
    const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    });

    const statusCode = 400

    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors
    }
}

export default handleZodError;