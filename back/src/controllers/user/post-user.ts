// export const postUser = (req, res) => {
//   res.json([
//     { name: "post1", id: 20 },
//     { name: "post2", id: 21 },
//   ]);
// };
import { RequestHandler } from "express";

import { userModel } from "../../models/user.model";

// };
export const postUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, phoneNumber, address, role } = req.body;
    await userModel.create({
      email,
      password,
      phoneNumber,
      address,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "user nemegdsen" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
