import { RequestHandler } from "express";

import { userModel } from "../../models/user.model";
import { orderModel } from "../../models/order.model";

export const patchOrder: RequestHandler = async (req, res) => {
  try {
    const { id, newUser, newTotalPrice, newFoodOrderItems, newStatus } =
      req.body;

    const result = await orderModel.updateOne(
      { _id: id },

      {
        $set: {
          user: newUser,
          totalPrice: newTotalPrice,
          foodOrderItems: newFoodOrderItems,
          status: newStatus,
          updatedAt: new Date(),
        },
      }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
