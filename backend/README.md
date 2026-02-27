# W2 Extraction FastAPI Backend

FastAPI service for extracting structured W-2 data from uploaded files using Gemini.

## Supported Input
- `type` must be one of:
  - `w2-form`
  - `5498`
  - `ssa-1099`
- `files` as multipart upload (single or multiple)
- Allowed:
  - PDFs only (one or many), or
  - Images only (one or many)
- Not allowed:
  - Mixed PDF + image in the same request

## Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Set `GOOGLE_API_KEY` in `.env`.

## Run
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API
### POST `/documents/extract`
`multipart/form-data`:
- `type`: `w2-form` | `5498` | `ssa-1099`
- `files`: one or many files

Example:
```bash
curl --location 'http://127.0.0.1:8000/documents/extract' \
  --form 'type=w2-form' \
  --form 'files=@/absolute/path/to/file1.pdf' \
  --form 'files=@/absolute/path/to/file2.pdf'
```

## Response
Returns:
- per-file extraction result and status
- per-file token usage and optional cost
- aggregated request token usage and optional cost

If pricing values are not configured (`INPUT_COST_PER_MILLION`, `OUTPUT_COST_PER_MILLION`), cost fields are returned as null with `pricing_applied=false`.
