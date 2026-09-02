import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { createConversation,getConversations } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.post('/conversation',authUser,createConversation)
chatRouter.get('/conversation',authUser,getConversations)

export default chatRouter;