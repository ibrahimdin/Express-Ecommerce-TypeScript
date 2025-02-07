import Joi from "joi";
import { Order } from "./order.interface";

const orderValidationSchema = Joi.object<Order>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email address format",
      "any.required": "Email is required",
    }),
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be a whole number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

export default orderValidationSchema;
