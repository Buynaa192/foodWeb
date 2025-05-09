import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      res.status(400).json({ message: "user not found" });
      return;
    }
    const { password: hashedPassword, ...userWithoutPassword } =
      user.toObject();
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "user or password invalid" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.role === "admin",
      },
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
