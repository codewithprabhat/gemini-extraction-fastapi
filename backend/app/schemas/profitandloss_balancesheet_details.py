from typing import Any, List, Optional

from pydantic import BaseModel, Field


class Bbox(BaseModel):
    """Bounding box for a document block (left, top, width, height normalized 0-1)."""

    left: float = Field(default=0.0)
    top: float = Field(default=0.0)
    width: float = Field(default=0.0)
    height: float = Field(default=0.0)
    page: int = Field(default=1)
    original_page: int = Field(default=1)


class GranularConfidence(BaseModel):
    extract_confidence: Optional[float] = Field(default=None)
    parse_confidence: Optional[float] = Field(default=None)


class Block(BaseModel):
    """Document block: Title, Section Header, Table, or Footer."""

    type: str = Field(default="", description="Block type: Title, Section Header, Table, Footer")
    bbox: Optional[Bbox] = Field(default=None)
    content: str = Field(default="", description="Block text or table content (HTML/markdown)")
    image_url: Optional[str] = Field(default=None)
    chart_data: Optional[Any] = Field(default=None)
    confidence: Optional[str] = Field(default=None, description="e.g. high")
    granular_confidence: Optional[GranularConfidence] = Field(default=None)
    extra: Optional[Any] = Field(default=None)


class Chunk(BaseModel):
    """Document chunk with full content and parsed blocks."""

    content: str = Field(default="", description="Full document content as markdown/text")
    embed: str = Field(default="", description="Same as content for compatibility")
    enriched: Optional[Any] = Field(default=None)
    enrichment_success: bool = Field(default=False)
    blocks: List[Block] = Field(default_factory=list, description="Parsed blocks (Title, Section Header, Table, Footer)")


class ReductoResult(BaseModel):
    type: str = Field(default="full")
    chunks: List[Chunk] = Field(default_factory=list)
    ocr: Optional[Any] = Field(default=None)
    custom: Optional[Any] = Field(default=None)


class ProfitAndLossBalanceSheetDetails(BaseModel):
    """Reducto-style extraction response for Profit and Loss / Balance Sheet documents."""

    result: Optional[ReductoResult] = Field(default=None)
