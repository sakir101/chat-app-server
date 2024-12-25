"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormList = void 0;
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.FormList = (0, mongoose_1.model)('FormList', formSchema);
