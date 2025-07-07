import { RequestHandler } from "express";

import { orderModel } from "../../models/order.model";
import { foodModel } from "../../models/food.model";


export const postOrder: RequestHandler = async (req, res) => {
  try {
    const { user, foodOrderItems, status } = req.body;

    const foodOrderItemsPopulated = await foodModel.find({
      _id: { $in: foodOrderItems.map((item) => item.food) },
    });

    const totalPrice = foodOrderItems.reduce((total, item) => {
      const food = foodOrderItemsPopulated.find(
        (itm) => itm._id.toString() === item.food.toString()
      );
      if (food) {
        return total + food.price * item.quantity;
      }
      return total;
    }, 0);

    await orderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "order nemegdsen" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
