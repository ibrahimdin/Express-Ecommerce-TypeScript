import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { Product } from "./product.interface";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;

    const { error } = productValidationSchema.validate(product);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await ProductServices.createProductDB(product);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm: string | undefined = req.query.searchTerm as
      | string
      | undefined;
    const result = await ProductServices.getAllProductsDB(searchTerm);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getProductByIdDB(productId);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product: Product = req.body;

    const { error } = productValidationSchema.validate(product);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await ProductServices.updateProductByIdDB(
      productId,
      product
    );

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProductByIdDB(productId);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
