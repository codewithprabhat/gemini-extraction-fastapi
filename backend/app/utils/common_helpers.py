import asyncio
import functools
import random
import traceback
from typing import Any, Callable, Coroutine, TypeVar

from google.genai.errors import ServerError
from httpx import HTTPStatusError

from app.core.config import settings

F = TypeVar("F", bound=Callable[..., Coroutine[Any, Any, Any]])


def async_retry_with_exponential_backoff(func: F) -> F:
    @functools.wraps(func)
    async def wrapper(*args: Any, **kwargs: Any) -> Any:
        for attempt in range(settings.MAX_RETRIES):
            try:
                return await func(*args, **kwargs)
            except (HTTPStatusError, ServerError) as exc:
                status_code = None
                if isinstance(exc, HTTPStatusError):
                    status_code = exc.response.status_code
                if isinstance(exc, ServerError):
                    status_code = exc.status_code

                if status_code in {429, 500, 503} and attempt < settings.MAX_RETRIES - 1:
                    delay = min(
                        settings.INITIAL_RETRY_DELAY * (2**attempt) + random.uniform(0, 1),
                        settings.MAX_RETRY_DELAY,
                    )
                    await asyncio.sleep(delay)
                    continue

                traceback.print_exc()
                raise
            except Exception:
                traceback.print_exc()
                raise

        raise RuntimeError(f"Failed calling {func.__name__} after {settings.MAX_RETRIES} retries.")

    return wrapper  # type: ignore[return-value]
