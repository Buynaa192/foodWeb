import { userModel } from "../../models/user.model";

export const getOneUser = async (req, res) => {
  const { id } = req.params;
  const oneUser = await userModel.findById({ _id: id });
  return res.status(200).json({ oneUser });
};
