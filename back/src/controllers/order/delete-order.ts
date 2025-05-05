import { RequestHandler } from "express";

import { orderModel } from "../../models/order.model";

export const deleteOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await orderModel.deleteOne({
      _id: id,
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "order oldsongui" });
      return;
    }
    res.status(200).json({ message: "order ustgagdsn" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
