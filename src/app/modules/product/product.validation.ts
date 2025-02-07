import Joi from "joi";
import { Inventory, Product, Variant } from "./product.interface";

// Joi schema for the Inventory interface
const inventoryValidationSchema = Joi.object<Inventory>({
  quantity: Joi.number().required().min(0).messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least zero",
  }),
  inStock: Joi.boolean().required().messages({
    "any.required": "InStock status is required",
    "boolean.base": "InStock must be a boolean value",
  }),
});

// Joi schema for the Variant interface
const variantValidationSchema = Joi.object<Variant>({
  type: Joi.string().required().messages({
    "any.required": "Variant type is required",
    "string.base": "Variant type must be a string",
  }),
  value: Joi.string().required().messages({
    "any.required": "Variant value is required",
    "string.base": "Variant value must be a string",
  }),
});

// Joi schema for the Product interface
export const productValidationSchema = Joi.object<Product>({
  name: Joi.string().required().messages({
    "any.required": "Product name is required",
    "string.base": "Product name must be a string",
  }),
  description: Joi.string().required().messages({
    "any.required": "Product description is required",
    "string.base": "Product description must be a string",
  }),
  price: Joi.number().required().positive().messages({
    "any.required": "Product price is required",
    "number.base": "Product price must be a number",
    "number.positive": "Product price must be a positive number",
  }),
  category: Joi.string().required().messages({
    "any.required": "Product category is required",
    "string.base": "Product category must be a string",
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Product tags are required",
    "array.base": "Product tags must be an array",
    "array.includesRequiredUnknowns": "Product tags must contain only strings",
  }),
  variants: Joi.array().items(variantValidationSchema).required().messages({
    "any.required": "Product variants are required",
    "array.base": "Product variants must be an array",
    "array.includesRequiredUnknowns":
      "Product variants must contain only valid variant objects",
  }),
  inventory: inventoryValidationSchema.required().messages({
    "any.required": "Inventory details are required",
    "object.base": "Inventory must be an object",
  }),
});

export default productValidationSchema;
