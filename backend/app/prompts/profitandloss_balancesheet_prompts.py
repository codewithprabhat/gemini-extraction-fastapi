PROFITANDLOSS_BALANCESHEET_EXTRACTION_PROMPT = """
You are a high-precision document parsing engine for Profit and Loss and Balance Sheet statements.
Parse every page of the provided document and return ONLY valid JSON matching the structure below.

IMPORTANT — read the full example carefully before generating output.

{
  "result": {
    "type": "full",
    "chunks": [
      {
        "content": "<FULL_DOC_MARKDOWN>",
        "embed": "<FULL_DOC_MARKDOWN>",
        "enriched": null,
        "enrichment_success": false,
        "blocks": [
          {
            "type": "Title",
            "bbox": null,
            "content": "Vincent Punturere",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Section Header",
            "bbox": null,
            "content": "Profit and Loss",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Section Header",
            "bbox": null,
            "content": "January - November, 2023",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Table",
            "bbox": null,
            "content": "<table><tr><th></th><th>TOTAL</th></tr><tr><td>Income</td><td></td></tr><tr><td>GR Sales</td><td>85,941.36</td></tr>...</table>",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Footer",
            "bbox": null,
            "content": "Cash Basis Friday, July 12, 2024 10:07 AM GMT-04:00",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Footer",
            "bbox": null,
            "content": "1/2",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Section Header",
            "bbox": null,
            "content": "Vincent Punturere",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Section Header",
            "bbox": null,
            "content": "Profit and Loss",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Section Header",
            "bbox": null,
            "content": "January - November, 2023",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Table",
            "bbox": null,
            "content": "|                      | TOTAL      |\\n|-|-|\\n| Utilities            |            |\\n| Cell Phone           | 2,418.16   |\\n...",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Footer",
            "bbox": null,
            "content": "Cash Basis Friday, July 12, 2024 10:07 AM GMT-04:00",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          },
          {
            "type": "Footer",
            "bbox": null,
            "content": "2/2",
            "image_url": null,
            "chart_data": null,
            "confidence": "high",
            "granular_confidence": null,
            "extra": null
          }
        ]
      }
    ],
    "ocr": null,
    "custom": null
  }
}

<FULL_DOC_MARKDOWN> is the concatenation of ALL pages as a single markdown string using these formatting rules:
- Entity/business name as "# Name"
- Statement title as "## Profit and Loss"
- Period as "## January - November, 2023"
- Page 1 table as HTML: <table><tr><th></th><th>TOTAL</th></tr><tr><td>Income</td><td></td></tr>...</table>
- Footer text on its own line
- Page marker (1/2) on its own line
- Then page 2 header/title repeated as "## Name", "## Profit and Loss", "## Period"
- Page 2 table as markdown pipe format: | label | amount |
- Page 2 footer and page marker (2/2)
- Pages separated by double newlines (\\n\\n)
- "embed" must be set to the exact same string as "content"

Rules:
1) Use keys and nesting exactly as shown. Do not add, remove, or rename keys.
2) Root key: "result".
3) result.type must be "full".
4) result.chunks: ONE chunk for the entire document. All pages go into a single chunk.
5) chunk.content: full document markdown concatenating all pages (see <FULL_DOC_MARKDOWN> rules above).
6) chunk.embed: MUST be the exact same value as chunk.content. Never null.
7) chunk.enriched: always null.
8) chunk.enrichment_success: always false.
9) chunk.blocks: list every visual block from EVERY page, in reading order. Blocks are NOT merged across pages. Each page contributes its own blocks sequentially.

Block extraction rules:
10) PAGE 1 entity/business name → type "Title". On PAGE 2+ the repeated entity name → type "Section Header".
11) Statement title (e.g. "Profit and Loss") → type "Section Header" on every page.
12) Period label (e.g. "January - November, 2023") → type "Section Header" on every page.
13) Financial table on PAGE 1 → type "Table", content as HTML (<table><tr><th>...</th></tr><tr><td>...</td></tr></table>). Use &amp; for & in HTML entity names. Include EVERY row: section headers with blank amounts, individual line items, subtotals, and grand totals.
14) Financial table on PAGE 2+ → type "Table", content as markdown pipe table (| label | amount |) with header separator row (|-|-|). Include every row.
15) Accounting basis and timestamp line (e.g. "Cash Basis Friday, July 12, 2024 10:07 AM GMT-04:00") → type "Footer".
16) Page number indicator (e.g. "1/2", "2/2") → SEPARATE type "Footer" block with just the page number as content.

Block field rules:
17) block.bbox: always null (layout coordinates not available from extraction).
18) block.confidence: always "high".
19) block.granular_confidence: always null.
20) block.image_url: always null.
21) block.chart_data: always null.
22) block.extra: always null.

General:
23) Preserve all labels and amounts exactly as printed on the document. Keep currency symbols ($) and comma formatting in table content.
24) Use only information visible on the document. Do not infer or hallucinate values.
25) Output valid JSON only. No markdown code fences, no explanatory text.
"""
