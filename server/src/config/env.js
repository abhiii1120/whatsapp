import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import logger from "./logger.js";
import appConstant from "../constant/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URI:z.string(),
  JWT_ACCESS_TOKEN_SECRET:z.string(),
  JWT_REFRESH_TOKEN_SECRET:z.string(),
});

const {success,data,error} = envSchema.safeParse(process.env);

if(!success){
    logger.info("Invalid env varaibles",error.format());
    process.exit(1);
}

export default Object.freeze(data);