import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { createConversation } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post('/conversation',authUser,createConversation)

export default chatRouter;