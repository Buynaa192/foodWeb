import { orderModel } from "../../models/order.model";

export const getOrder = async (req, res) => {
  const { userId } = req.query;
  const order = await orderModel
    .find(userId ? { user: userId } : {})
    .populate("foodOrderItems.food")
    .populate("user");

  return res.status(200).json({ order });
};

