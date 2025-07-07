
import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";


export const createFood: RequestHandler = async (req, res) => {
  try {
    const { foodName, price, category, ingredients, image } = req.body;
    await foodModel.create({
      foodName,
      price,
      category,
      ingredients,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "food nemegdsen" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
