import { Server } from "socket.io";
import logger from "../config/logger.js";
import { verifyAccessToken } from "../utils/auth.utils.js";
import * as ConversationDao from "../dao/conversion.dao.js";

export function initializeSocketServer(httpServer) {
  const io = new Server(httpServer);

  io.use((socket, next) => {

    const token = socket.handshake.headers.authorization?.split(" ")[1];

    if (!token)
      return next(new Error("Authentication error:no token provided"));

    try {
      const decoded = verifyAccessToken(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      return next(new Error("Authentication error:invalid token"));
    }
  });

  io.on("connection", (socket) => {
    logger.info({ ID: socket.userId }, "A user connected");

    // make user join a room with their userId so we can send messages to them specifically
    socket.join(socket.userId)

    socket.on("sendMessage", async (data) => {

      //if data comes in string then we will convert it into json format
      if(typeof data === "string"){
        data = JSON.parse(data);
      }

      const isConversationExists = await ConversationDao.getConversationByParticipants([socket.userId , data["receiver"]]);

      if(!isConversationExists){
        await ConversationDao.createConversation([socket.userId,data["receiver"]])
      }

      const receiver = data.receiver
      io.to(receiver).emit("receiveMessage",data)

      // io.emit("receiveMessage",data) --- for global message like for sending messages to all users who are connected to server.
    })

    socket.on("disconnect",() => {
      logger.info({USER_ID : socket.userId}, "A user disconnected:")
      socket.leave(socket.userId)
    })
  });
}
