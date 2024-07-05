import redis.asyncio as aioredis

redis = aioredis.from_url("redis://localhost")


async def startup_event():
    await redis.ping()


async def shutdown_event():
    await redis.close()
