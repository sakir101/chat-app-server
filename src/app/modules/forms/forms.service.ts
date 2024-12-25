import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IForm } from "./forms.interface";
import { FormList } from "./forms.model";
import { UpdateQuery } from 'mongoose';

const createForm = async (payload: IForm): Promise<IForm> => {
    const formBody = {
        ...payload,
        formData: payload.formData || [], // Initialize as an empty array if undefined
    };

    const result = await FormList.create(formBody);
    return result;
};

const fetchAllForms = async (): Promise<IForm[]> => {
    const forms = await FormList.find();
    if (!forms) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No form found');
    }
    return forms;
};

const getFormData = async (id: string): Promise<IForm | null> => {
    const result = await FormList.findById(id).select('formData')
    return result;
}

const updateForm = async (
    id: string,
    payload: string[]
): Promise<IForm | null> => {
    const form = await FormList.findById(id);

    if (form && form.fieldType && (form.fieldType.length + 1) !== payload.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Fill All Field');
    }



    if (payload) {
        // Make sure formData is in the correct format: an array of strings
        const newFormDataRow = payload;

        if (!Array.isArray(newFormDataRow) || !newFormDataRow.every((item) => typeof item === 'string')) {
            throw new Error("Invalid formData format. It should be an array of strings.");
        }

        const result = await FormList.findByIdAndUpdate(
            id,
            { $push: { formData: newFormDataRow } },  // Push only the new row
            { new: true }
        );

        return result;
    }
    return null;
};
const addField = async (
    formId: string,
    label: string,
    type: string,
    selectOptions?: string[] // Optional parameter for select options
): Promise<IForm | null> => {
    // Initialize the update object with the correct type
    const updateObj: UpdateQuery<IForm> = {
        $push: { fieldLabel: label, fieldType: type },
        $inc: { fieldNumber: 1 }
    };

    if (type === 'select' && selectOptions) {
        updateObj.$push = {
            ...updateObj.$push,
            selectFieldLabel: label,
            selectOptions: selectOptions
        };
    }

    // Perform the update operation
    const result = await FormList.findByIdAndUpdate(
        formId,
        updateObj,
        { new: true }
    );

    return result;
};

const deleteField = async (
    formId: string,
    fieldIndex: number,
    fieldType: string,
): Promise<IForm | null> => {
    const form = await FormList.findById(formId);

    if (!form || fieldIndex < 0 || fieldIndex >= form.fieldLabel.length) {
        return null; // Return early if form is not found or fieldIndex is invalid
    }

    if (fieldType === 'select') {
        const selectCountBeforeIndex: number = form.fieldType
            .slice(0, fieldIndex)
            .filter((type) => type === 'select').length;

        form.fieldLabel.splice(fieldIndex, 1);
        form.fieldType.splice(fieldIndex, 1);
        form.selectFieldLabel.splice(selectCountBeforeIndex, 1);
        form.formData.forEach((row) => row.splice(fieldIndex, 1));
        form.selectOptions.splice(selectCountBeforeIndex, 1); // Adjust to avoid undefined
        form.fieldNumber -= 1;

        await form.save();

        return form;
    } else {
        // For non-select fields
        form.fieldLabel.splice(fieldIndex, 1);
        form.fieldType.splice(fieldIndex, 1);
        form.formData.forEach((row) => row.splice(fieldIndex, 1));
        form.fieldNumber -= 1;

        await form.save();

        return form;
    }
};


const updateField = async (formId: string, index: number, newLabel: string): Promise<IForm | null> => {
    const form = await FormList.findById(formId);

    if (form && index >= 0 && index < form.fieldLabel.length) {
        form.fieldLabel[index] = newLabel;


        await form.save();

        return form;
    }

    return null;
};

const deleteForm = async (id: string): Promise<IForm | null> => {
    const result = await FormList.findByIdAndDelete(id);
    return result;
}

export const FormService = {
    createForm,
    fetchAllForms,
    getFormData,
    updateForm,
    addField,
    deleteField,
    updateField,
    deleteForm
}