"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const orderValidationSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        "string.base": "Email must be a string",
        "string.email": "Invalid email address format",
        "any.required": "Email is required",
    }),
    productId: joi_1.default.string().required().messages({
        "any.required": "Product ID is required",
    }),
    price: joi_1.default.number().positive().required().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be a positive number",
        "any.required": "Price is required",
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be a whole number",
        "number.min": "Quantity must be at least 1",
        "any.required": "Quantity is required",
    }),
});
exports.default = orderValidationSchema;
