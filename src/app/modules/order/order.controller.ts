import { Request, Response } from "express";
import { Order } from "./order.interface";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;

    const { error } = orderValidationSchema.validate(order);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await OrderServices.createOrderDB(order);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email: string | undefined = req.query.email as string | undefined;
    const result = await OrderServices.getAllOrdersDB(email);

    if (result.length === 0) {
      const error = {
        success: false,
        message: "Order not found",
      };
      throw error;
    }

    res.status(200).json({
      success: true,
      message: email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
