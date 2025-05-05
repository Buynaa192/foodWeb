import { Router } from "express";
import { getUser } from "../controllers/user/get-user";
import { deleteUser } from "../controllers/user/delete-user";
import { patchUser } from "../controllers/user/patch-user";
import { postUser } from "../controllers/user/post-user";
import { getOneUser } from "../controllers/user/getOneUser";
import { loginUser } from "../controllers/user/login-user";

const userRouter = Router();
userRouter
  .get("/", getUser)
  .delete("/delete/:id", deleteUser)
  .get("/:id", getOneUser)
  .post("/post", postUser)
  .put("/put", patchUser)
  .post("/login", loginUser);
export default userRouter;
