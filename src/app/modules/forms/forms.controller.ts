import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { FormService } from "./forms.service";
import sendResponse from "../../../shared/sendResponse";
import { IForm } from "./forms.interface";
import httpStatus from "http-status";

const createForm = catchAsync(async (req: Request, res: Response) => {


    const { ...FormBodyData } = req.body
    const result = await FormService.createForm(FormBodyData)

    sendResponse<IForm>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'From body created successfully',
        data: result,
    });
})

const fetchAllForms = catchAsync(
    async (req: Request, res: Response) => {

        const result = await FormService.fetchAllForms()

        sendResponse<IForm[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Forms retrived successfully',
            data: result,
        });
    }
)

const getFormData = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await FormService.getFormData(id)

        sendResponse<IForm>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'From data from form retrived successfully',
            data: result,
        });
    }
)

const updateForm = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;


        const result = await FormService.updateForm(id, updatedData)

        sendResponse<IForm>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Form data update successfully',
            data: result,
        });
    }
)

const addField = catchAsync(
    async (req: Request, res: Response) => {
        const formId = req.params.id;
        const { fieldLabel, fieldType, selectOptions } = req.body;
        const result = await FormService.addField(formId, fieldLabel, fieldType, selectOptions);

        sendResponse<IForm>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Field added successfully',
            data: result,
        });
    }
);

const deleteField = catchAsync(
    async (req: Request, res: Response) => {
        const formId = req.params.id;
        const { fieldIndex, fieldType } = req.body;

        const result = await FormService.deleteField(formId, fieldIndex, fieldType);

        sendResponse<IForm>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Field deleted successfully',
            data: result,
        });
    }
);

const updateField = catchAsync(
    async (req: Request, res: Response) => {
        const formId = req.params.id;
        const { fieldIndex, fieldData } = req.body;

        const result = await FormService.updateField(formId, fieldIndex, fieldData);

        sendResponse<IForm>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Field updated successfully',
            data: result,
        });
    }
);

const deleteForm = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await FormService.deleteForm(id)

        sendResponse<IForm>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Form deleted successfully',
            data: result,
        });
    }
)

export const FormController = {
    createForm,
    fetchAllForms,
    getFormData,
    updateForm,
    addField,
    deleteField,
    updateField,
    deleteForm
}