import { RequestHandler } from "express";

import { userModel } from "../../models/user.model";

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.deleteOne({
      _id: id,
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "user oldsongui" });
      return;
    }
    res.status(200).json({ message: "user ustgagdsn" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
