import * as authController from "../controllers/auth.controller.js";
import { Router } from "express";
import * as authValidator from "../validator/auth.validator.js";

const authRouter = Router();

/**
 * Route for user registration.
 * @name POST /api/auth/register
 * @public
 */
authRouter.post("/register",authValidator.registerUserValidator,authController.registerUser);

/**
 * Route for user login.
 */
authRouter.post("/login",authValidator.loginUserValidator,authController.loginUser);

export default authRouter