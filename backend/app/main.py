from .api import router as api_router

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .redis_client import startup_event, shutdown_event

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await startup_event()


@app.on_event("shutdown")
async def on_shutdown():
    await shutdown_event()


app.include_router(api_router, prefix="/api")
