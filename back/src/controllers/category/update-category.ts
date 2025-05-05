// export const updateCategory = (req, res) => {
//   res.json([
//     { name: "patch1", price: 100 },
//     { name: "patch2", price: 200 },
//   ]);
// };
import { RequestHandler } from "express";

import { foodCategoryModel } from "../../models/foodCategory.model";

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const { id, categoryName, newCategoryName } = req.body;
    const result = await foodCategoryModel.updateOne(
      { _id: id },
      {
        $set: {
          categoryName: newCategoryName,
          updatedAt: new Date(),
        },
      }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "category not found" });
    }
    res.status(200).json({ message: "category shinchlegdsn" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
// if (!categoryName || !newCategoryName) {
//   res.status(400).json({
//     message: "both categoryName and newCategoryName are required",
//   });
// }
