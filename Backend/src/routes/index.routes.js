import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.route.js";

let indexRouter = express.Router();

// --- use auth routes ---
indexRouter.use("/auth", authRouter);

// --- use user routes ---
indexRouter.use("/users",userRouter);

export default indexRouter;
