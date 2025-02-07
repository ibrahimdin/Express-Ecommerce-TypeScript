"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const InventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "InStock status is required"],
    },
});
const VariantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "Variant type is required"],
    },
    value: {
        type: String,
        required: [true, "Variant value is required"],
    },
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    tags: {
        type: [String],
        required: [true, "Product tags are required"],
    },
    variants: {
        type: [VariantSchema],
        required: [true, "Product variants are required"],
    },
    inventory: {
        type: InventorySchema,
        required: [true, "Inventory details are required"],
    },
});
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
