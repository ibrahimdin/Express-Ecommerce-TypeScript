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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Checking existence of product
    const product = yield product_model_1.ProductModel.findById(order.productId);
    if (!product) {
        const error = {
            success: false,
            message: "Product not found",
        };
        throw error;
    }
    // Checking Quantity Availability
    if (product.inventory.quantity <= 0 ||
        !product.inventory.inStock ||
        order.quantity > product.inventory.quantity) {
        const error = {
            success: false,
            message: "Insufficient quantity available in inventory",
        };
        throw error;
    }
    // Update product quantity and set inStock to false if quantity becomes 0
    const updatedProduct = yield product_model_1.ProductModel.findOneAndUpdate({ _id: order.productId, "inventory.quantity": { $gt: 0 } }, {
        $inc: { "inventory.quantity": -order.quantity },
        "inventory.inStock": true,
    }, { new: true });
    // Check if the product's quantity became 0 after the update
    if (((_a = updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.inventory) === null || _a === void 0 ? void 0 : _a.quantity) === 0) {
        yield product_model_1.ProductModel.updateOne({ _id: order.productId }, { "inventory.inStock": false });
    }
    // Create order
    const result = yield order_model_1.OrderModel.create(order);
    return result;
});
const getAllOrdersDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield order_model_1.OrderModel.find({ email: email });
    }
    else {
        return yield order_model_1.OrderModel.find();
    }
});
exports.OrderServices = {
    createOrderDB,
    getAllOrdersDB,
};
