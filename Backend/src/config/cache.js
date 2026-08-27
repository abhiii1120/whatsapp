import Redis from 'ioredis';
import env from "./env.js";
import logger from './logger.js';

let redisClient

export function getRedisClient(){
    if(!redisClient){
        redisClient = createRedisClient()
    }
    return redisClient
}

export function createRedisClient(){

    const redisClient = new Redis(env.REDIS_URI)

    redisClient.on("connect",() => {
        logger.info("Connected to Redis")
    })

    redisClient.on("error",(err) => {
        console.error("Redis error:",err);
    })

    return redisClient;
}