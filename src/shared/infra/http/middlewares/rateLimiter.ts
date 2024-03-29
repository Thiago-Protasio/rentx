import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "@shared/errors/AppError";

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const redisClient = redis.createClient({
        legacyMode: true,
        socket: {
            host: "localhost",
            port: 6379,
        },
    });

    await redisClient.connect();

    const limiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: "rateLimiter",
        points: 10,
        duration: 5,
    });

    limiter
        .consume(request.ip)
        .then(() => {
            next();
        })
        .catch((err) => {
            throw new AppError(err.message, 429);
        });
}
