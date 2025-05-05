import { userModel } from "../../models/user.model";

export const getUser = async (req, res) => {
  const user = await userModel.find({});
  return res.status(200).json({ user });
};
