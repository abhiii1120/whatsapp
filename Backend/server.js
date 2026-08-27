import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";
import env from "./src/config/env.js";
import { createRedisClient } from "./src/config/cache.js";
// --- database ---
await connectDB();

createRedisClient();

let PORT = env.PORT

app.listen(PORT, () => {
  logger.info({ PORT: PORT }, "server is running on port 3000");
});
