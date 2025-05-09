import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getMe } from "../controllers/auth/me";
import { signIn } from "../controllers/auth/sing-in";
import { signUp } from "../controllers/auth/sing-up";

export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signin", signIn)
  .post("/signup", signUp);
