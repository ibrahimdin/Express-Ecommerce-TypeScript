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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const { error } = product_validation_1.default.validate(product);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const result = yield product_service_1.ProductServices.createProductDB(product);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductsDB(searchTerm);
        // Throw error if there are no matches
        if (result.length === 0) {
            const error = {
                success: false,
                message: `No products found matching the search term '${searchTerm}'`,
            };
            throw error;
        }
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : `Products fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductServices.getProductByIdDB(productId);
        // if product is not found
        if (!result) {
            const error = {
                success: false,
                message: "Product not found!",
            };
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = req.body;
        const { error } = product_validation_1.default.validate(product);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const result = yield product_service_1.ProductServices.updateProductByIdDB(productId, product);
        // If product does not exist
        if (!result) {
            const error = {
                success: false,
                message: "Product does not exist!",
            };
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductServices.deleteProductByIdDB(productId);
        if (!result.deletedCount) {
            const error = {
                success: false,
                message: "Product does not exist!",
            };
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
