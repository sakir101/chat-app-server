"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const forms_model_1 = require("./forms.model");
const createForm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const formBody = Object.assign(Object.assign({}, payload), { formData: payload.formData || [] });
    const result = yield forms_model_1.FormList.create(formBody);
    return result;
});
const fetchAllForms = () => __awaiter(void 0, void 0, void 0, function* () {
    const forms = yield forms_model_1.FormList.find();
    if (!forms) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No form found');
    }
    return forms;
});
const getFormData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield forms_model_1.FormList.findById(id).select('formData');
    return result;
});
const updateForm = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield forms_model_1.FormList.findById(id);
    if (form && form.fieldType && (form.fieldType.length + 1) !== payload.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Fill All Field');
    }
    if (payload) {
        // Make sure formData is in the correct format: an array of strings
        const newFormDataRow = payload;
        if (!Array.isArray(newFormDataRow) || !newFormDataRow.every((item) => typeof item === 'string')) {
            throw new Error("Invalid formData format. It should be an array of strings.");
        }
        const result = yield forms_model_1.FormList.findByIdAndUpdate(id, { $push: { formData: newFormDataRow } }, // Push only the new row
        { new: true });
        return result;
    }
    return null;
});
const addField = (formId, label, type, selectOptions // Optional parameter for select options
) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize the update object with the correct type
    const updateObj = {
        $push: { fieldLabel: label, fieldType: type },
        $inc: { fieldNumber: 1 }
    };
    if (type === 'select' && selectOptions) {
        updateObj.$push = Object.assign(Object.assign({}, updateObj.$push), { selectFieldLabel: label, selectOptions: selectOptions });
    }
    // Perform the update operation
    const result = yield forms_model_1.FormList.findByIdAndUpdate(formId, updateObj, { new: true });
    return result;
});
const deleteField = (formId, fieldIndex, fieldType) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield forms_model_1.FormList.findById(formId);
    if (!form || fieldIndex < 0 || fieldIndex >= form.fieldLabel.length) {
        return null; // Return early if form is not found or fieldIndex is invalid
    }
    if (fieldType === 'select') {
        const selectCountBeforeIndex = form.fieldType
            .slice(0, fieldIndex)
            .filter((type) => type === 'select').length;
        form.fieldLabel.splice(fieldIndex, 1);
        form.fieldType.splice(fieldIndex, 1);
        form.selectFieldLabel.splice(selectCountBeforeIndex, 1);
        form.formData.forEach((row) => row.splice(fieldIndex, 1));
        form.selectOptions.splice(selectCountBeforeIndex, 1); // Adjust to avoid undefined
        form.fieldNumber -= 1;
        yield form.save();
        return form;
    }
    else {
        // For non-select fields
        form.fieldLabel.splice(fieldIndex, 1);
        form.fieldType.splice(fieldIndex, 1);
        form.formData.forEach((row) => row.splice(fieldIndex, 1));
        form.fieldNumber -= 1;
        yield form.save();
        return form;
    }
});
const updateField = (formId, index, newLabel) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield forms_model_1.FormList.findById(formId);
    if (form && index >= 0 && index < form.fieldLabel.length) {
        form.fieldLabel[index] = newLabel;
        yield form.save();
        return form;
    }
    return null;
});
const deleteForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield forms_model_1.FormList.findByIdAndDelete(id);
    return result;
});
exports.FormService = {
    createForm,
    fetchAllForms,
    getFormData,
    updateForm,
    addField,
    deleteField,
    updateField,
    deleteForm
};
