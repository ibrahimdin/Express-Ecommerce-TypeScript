import { Schema, model } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

const InventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "InStock status is required"],
  },
});

const VariantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, "Variant type is required"],
  },
  value: {
    type: String,
    required: [true, "Variant value is required"],
  },
});

const ProductSchema: Schema = new Schema<Product>({
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

export const ProductModel = model<Product>("Product", ProductSchema);
