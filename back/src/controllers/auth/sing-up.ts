import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "user already exist" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const { password: userPassword, ...userWithoutPassword } =
      newUser.toObject();
    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.role === "admin" },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
