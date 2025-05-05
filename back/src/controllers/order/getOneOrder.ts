import { orderModel } from "../../models/order.model";

export const getOneOrder = async (req, res) => {
  const { id } = req.params;
  const oneOrder = await orderModel.findById({ _id: id });
  return res.status(200).json({ oneOrder });
};
