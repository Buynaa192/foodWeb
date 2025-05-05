import { foodModel } from "../../models/food.model";

export const allCount = async (req, res) => {
  try {
    const count = await foodModel.find({}).countDocuments();
    return res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ message: "hud2" });
  }
};
