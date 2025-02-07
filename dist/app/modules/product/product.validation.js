"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schema for the Inventory interface
const inventoryValidationSchema = joi_1.default.object({
    quantity: joi_1.default.number().required().min(0).messages({
        "any.required": "Quantity is required",
        "number.base": "Quantity must be a number",
        "number.min": "Quantity must be at least zero",
    }),
    inStock: joi_1.default.boolean().required().messages({
        "any.required": "InStock status is required",
        "boolean.base": "InStock must be a boolean value",
    }),
});
// Joi schema for the Variant interface
const variantValidationSchema = joi_1.default.object({
    type: joi_1.default.string().required().messages({
        "any.required": "Variant type is required",
        "string.base": "Variant type must be a string",
    }),
    value: joi_1.default.string().required().messages({
        "any.required": "Variant value is required",
        "string.base": "Variant value must be a string",
    }),
});
// Joi schema for the Product interface
exports.productValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "any.required": "Product name is required",
        "string.base": "Product name must be a string",
    }),
    description: joi_1.default.string().required().messages({
        "any.required": "Product description is required",
        "string.base": "Product description must be a string",
    }),
    price: joi_1.default.number().required().positive().messages({
        "any.required": "Product price is required",
        "number.base": "Product price must be a number",
        "number.positive": "Product price must be a positive number",
    }),
    category: joi_1.default.string().required().messages({
        "any.required": "Product category is required",
        "string.base": "Product category must be a string",
    }),
    tags: joi_1.default.array().items(joi_1.default.string()).required().messages({
        "any.required": "Product tags are required",
        "array.base": "Product tags must be an array",
        "array.includesRequiredUnknowns": "Product tags must contain only strings",
    }),
    variants: joi_1.default.array().items(variantValidationSchema).required().messages({
        "any.required": "Product variants are required",
        "array.base": "Product variants must be an array",
        "array.includesRequiredUnknowns": "Product variants must contain only valid variant objects",
    }),
    inventory: inventoryValidationSchema.required().messages({
        "any.required": "Inventory details are required",
        "object.base": "Inventory must be an object",
    }),
});
exports.default = exports.productValidationSchema;
