from typing import ClassVar

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DEFAULT_ALLOWED_ORIGINS: ClassVar[list[str]] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    GOOGLE_API_KEY: str

    GEMINI_MODEL_EXTRACTION: str = "gemini-2.5-flash"
    MAX_RETRIES: int = 7
    INITIAL_RETRY_DELAY: float = 1.0
    MAX_RETRY_DELAY: float = 120.0
    ALLOWED_ORIGINS: str = ""

    # Optional pricing config for estimated cost calculation.
    INPUT_COST_PER_MILLION: float | None = None
    OUTPUT_COST_PER_MILLION: float | None = None

    @field_validator("INPUT_COST_PER_MILLION", "OUTPUT_COST_PER_MILLION", mode="before")
    @classmethod
    def empty_string_to_none(cls, value: object) -> object:
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @property
    def cors_allow_origins(self) -> list[str]:
        # Keep localhost defaults for development and append optional production origins.
        extra_origins = [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return [*self.DEFAULT_ALLOWED_ORIGINS, *extra_origins]


settings = Settings()
