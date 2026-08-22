import * as authController from "../controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register",authController.registerUser);

export default authRouter