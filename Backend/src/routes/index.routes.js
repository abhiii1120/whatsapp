import express from "express";
import authRouter from "./auth.routes.js";

let indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;
