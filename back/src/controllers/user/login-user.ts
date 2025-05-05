import { RequestHandler } from "express";

import { userModel } from "../../models/user.model";

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userModel.findOne({ email, password });
    res.status(200).json({ message: "user taarsan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
