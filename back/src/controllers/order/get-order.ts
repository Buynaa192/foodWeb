import { orderModel } from "../../models/order.model";

export const getOrder = async (req, res) => {
  const { userId } = req.query;
  const order = await orderModel
    .find(userId ? { user: userId } : {})
    .populate("foodOrderItems.food")
    .populate("user");

  return res.status(200).json({ order });
};
// export const getFoodsByCategory: RequestHandler = async (req, res) => {
//   const { categoryId } = req.query;

//   try {
//     const foods = await foodModel
//       .find(categoryId ? { category: categoryId } : {})
//       .populate("category");
//     res.status(200).json(foods);
//   } catch (error) {
//     res.status(500).json({ message: "hud2" });
//   }
// };
