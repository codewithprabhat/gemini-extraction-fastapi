from pathlib import Path

from fastapi import UploadFile

PDF_MIME_TYPES = {"application/pdf"}
IMAGE_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
}

PDF_EXTENSIONS = {".pdf"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"}


def _file_extension(upload: UploadFile) -> str:
    filename = upload.filename or ""
    return Path(filename).suffix.lower()


def detect_file_family(upload: UploadFile) -> str:
    mime_type = (upload.content_type or "").lower()
    extension = _file_extension(upload)

    if mime_type in PDF_MIME_TYPES or extension in PDF_EXTENSIONS:
        return "pdf"
    if mime_type in IMAGE_MIME_TYPES or extension in IMAGE_EXTENSIONS:
        return "image"
    return "unsupported"


def validate_uniform_family(files: list[UploadFile]) -> str:
    families = {detect_file_family(file) for file in files}

    if "unsupported" in families:
        raise ValueError("Unsupported file type. Only PDF and image files are allowed.")
    if len(families) > 1:
        raise ValueError("Mixed file types are not allowed. Send either only PDFs or only images.")

    return families.pop()
