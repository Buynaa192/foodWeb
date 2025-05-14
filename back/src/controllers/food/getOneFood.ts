import { foodModel } from "../../models/food.model";

export const getOneFood = async (req, res) => {
  const { id } = req.params;
  const oneFood = await foodModel.findById({ _id: id });
  return res.status(200).json({ oneFood });
};
// http://localhost:3001/food/68062483b5ef75c3d055944c
