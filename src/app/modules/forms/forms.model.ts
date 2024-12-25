import { Schema, model } from "mongoose";
import { FormModel, IForm } from "./forms.interface";



const formSchema = new Schema<IForm>({
    formName: {
        type: String,
        required: true,
        unique: true
    },

    fieldNumber: {
        type: Number,
        required: true,
    },

    fieldLabel: {
        type: [String],
        required: true
    },

    fieldType: {
        type: [String],
        required: true
    },

    selectFieldLabel: {
        type: [String],
    },

    selectOptions: {
        type: [[String]],
    },

    hasFile: {
        type: Boolean,
        default: false
    },

    formData: {
        type: [[String]],
    },

},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const FormList = model<IForm, FormModel>('FormList', formSchema);