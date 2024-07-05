import json

import aiohttp

from fastapi import HTTPException

from .redis_client import redis


async def get_usd_to_rub_rate():
    cache_key = "hh:usd_to_rub_rate"

    cached_rate = await redis.get(cache_key)
    if cached_rate:
        await redis.close()
        return float(cached_rate)

    async with aiohttp.ClientSession() as session:
        async with session.get("https://www.cbr-xml-daily.ru/daily_json.js") as response:
            if response.status != 200:
                raise HTTPException(status_code=500, detail="Failed to fetch exchange rate")

            text = await response.text()
            data = json.loads(text)
            usd_to_rub_rate = data['Valute']['USD']['Value']

            await redis.set(cache_key, usd_to_rub_rate, ex=60)
            return usd_to_rub_rate
