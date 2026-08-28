import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";
import env from "./src/config/env.js";
import { createRedisClient } from "./src/config/cache.js";
import {createServer} from 'http';
import {initializeSocketServer} from "./src/sockets/socket.server.js";
 
const server = createServer(app);

// --- connect to database ---
await connectDB();

// --- connect to redis ---
createRedisClient();

let PORT = env.PORT

// --- initialize socket server ---
initializeSocketServer(server);

server.listen(PORT, () => {
  logger.info({ PORT: PORT }, "server is running on port 3000");
});
