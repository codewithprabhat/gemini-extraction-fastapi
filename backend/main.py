from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import process_text_return, w2_extraction
from app.core.config import settings

load_dotenv()


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield


app = FastAPI(
    title="W2 Extraction API",
    description="API for extracting structured data from W-2 forms.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(w2_extraction.router, prefix="/documents", tags=["document"])
app.include_router(process_text_return.router, prefix="/documents", tags=["document"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
