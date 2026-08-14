"""Losslessly optimize PDF streams without downsampling or JPEG recompression."""

from __future__ import annotations

from io import BytesIO

import pikepdf


EMBEDDED_SIGNATURE_MARKERS = (b"/ByteRange", b"/Type /Sig", b"/SubFilter /adbe.pkcs7")


def has_embedded_signature(data: bytes) -> bool:
    return any(marker in data for marker in EMBEDDED_SIGNATURE_MARKERS)


def optimize_pdf_bytes(data: bytes, *, minimum_saving_bytes: int = 4096) -> bytes:
    """Return a smaller, visually identical PDF when lossless compression helps.

    Embedded cryptographic signatures cover the original byte sequence, so those
    files must not be rewritten. Image resolution and decoded pixel data are never
    changed; only PDF streams and object storage are compressed.
    """
    if not data.startswith(b"%PDF-"):
        raise ValueError("Input is not a PDF")
    if has_embedded_signature(data):
        return data

    source = BytesIO(data)
    output = BytesIO()
    with pikepdf.open(source) as pdf:
        pdf.save(
            output,
            compress_streams=True,
            object_stream_mode=pikepdf.ObjectStreamMode.generate,
            recompress_flate=True,
        )

    optimized = output.getvalue()
    if len(data) - len(optimized) < minimum_saving_bytes:
        return data
    return optimized
