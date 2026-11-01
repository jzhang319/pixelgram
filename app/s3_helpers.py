import os
import uuid

import boto3
from botocore.config import Config

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_S3_ACCESS_KEY_ID = os.environ.get("SUPABASE_S3_ACCESS_KEY_ID")
SUPABASE_S3_SECRET_ACCESS_KEY = os.environ.get("SUPABASE_S3_SECRET_ACCESS_KEY")
BUCKET_NAME = "pixelgram"
# svg excluded: rendered inline by browsers and can carry stored XSS on the
# shared Supabase origin. pdf excluded: can never pass the bucket's
# image/* allowed_mime_types, so it would always fail at upload anyway.
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
# ContentType is derived from this, never from the client-supplied
# file.content_type, so a mislabeled upload is still stored/served as
# whatever its validated extension actually says it is.
CONTENT_TYPES = {
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
}
MAX_BYTES = 10 * 1024 * 1024

s3 = boto3.client(
    "s3",
    endpoint_url=f"{SUPABASE_URL}/storage/v1/s3",
    region_name="us-west-1",
    aws_access_key_id=SUPABASE_S3_ACCESS_KEY_ID,
    aws_secret_access_key=SUPABASE_S3_SECRET_ACCESS_KEY,
    config=Config(connect_timeout=5, read_timeout=30, retries={"max_attempts": 2}),
)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):

    body = file.read(MAX_BYTES + 1)
    if len(body) > MAX_BYTES:
        return {"errors": "file too large"}

    content_type = CONTENT_TYPES.get(file.filename.rsplit(".", 1)[-1].lower())
    if not content_type:
        return {"errors": "file type not permitted"}

    try:
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=file.filename,
            Body=body,
            ContentType=content_type,
            CacheControl="max-age=3600",
        )
    except Exception as e:
        # in case that our Supabase Storage upload fails
        return {"errors": str(e)}

    return {"url": f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{file.filename}"}
