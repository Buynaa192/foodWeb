// export const deleteFood = (req, res) => {
//   res.json([
//     { name: "food1", price: 100 },
//     { name: "food2", price: 200 },
//   ]);
// };
import { RequestHandler } from "express";

import { foodModel } from "../../models/food.model";

export const deleteFood: RequestHandler = async (req, res) => {
  try {
    const { foodName } = req.body;
    const result = await foodModel.deleteOne({
      foodName,
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "food oldsongui" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
