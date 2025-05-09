import { RequestHandler } from "express";

export const authorizationMiddleware: RequestHandler = (req, res, next) => {
  const isAdmin = req.isAdmin;
  if (!isAdmin) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  next();
};
