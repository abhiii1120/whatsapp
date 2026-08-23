import mongoose from "mongoose";
import logger from "./logger.js";
import env from "./env.js";

let connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        logger.info("database connected successfully")
    } catch (error) {
        logger.info("error while connecting to db",error);
        process.exit(1);
    }
}

export default connectDB;