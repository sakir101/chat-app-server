import { Model } from "mongoose";

export type IForm = {
    formName: string
    fieldNumber: number
    fieldLabel: string[]
    fieldType: string[]
    selectFieldLabel: string[]
    selectOptions: string[][]
    hasFile: boolean
    formData: string[][];
}

export type FormModel = Model<IForm, Record<string, unknown>>