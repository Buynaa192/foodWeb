
import { RequestHandler } from "express";

import { userModel } from "../../models/user.model";

export const patchUser: RequestHandler = async (req, res) => {
  try {
    const { id, newEmail, newPassword, newPhoneNumber, newAddress } = req.body;

    const result = await userModel.updateOne(
      { _id: id },

      {
        $set: {
          email: newEmail,
          password: newPassword,
          phoneNumber: newPhoneNumber,
          address: newAddress,
          updatedAt: new Date(),
        },
      }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user shinchlegdsn" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
