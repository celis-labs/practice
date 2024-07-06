import os

import redis.asyncio as aioredis

from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

redis = aioredis.from_url(REDIS_URL)


async def startup_event():
    await redis.ping()


async def shutdown_event():
    await redis.close()
