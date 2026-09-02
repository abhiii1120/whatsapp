import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.route.js";
import chatRouter from "./chat.routes.js";

let indexRouter = express.Router();

// --- use auth routes ---
indexRouter.use("/auth", authRouter);

// --- use user routes ---
indexRouter.use("/users",userRouter);

indexRouter.use('/chats',chatRouter)

export default indexRouter;
