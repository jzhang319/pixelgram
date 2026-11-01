import os
# eventlet's greendns resolver can fail to resolve hostnames at all once
# dnspython 2.x is installed; disable it before eventlet is ever imported
# so uploads don't depend on the caller having set this in their shell.
os.environ.setdefault("EVENTLET_NO_GREENDNS", "yes")

import eventlet
eventlet.monkey_patch()

import requests
import uuid

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
BUCKET_NAME = "pixelgram"
# svg excluded: rendered inline by browsers and can carry stored XSS on the
# shared Supabase origin. pdf excluded: can never pass the bucket's
# image/* allowed_mime_types, so it would always fail at upload anyway.
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
MAX_BYTES = 10 * 1024 * 1024


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

    try:
        response = requests.post(
            f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{file.filename}",
            headers={
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
                "apikey": SUPABASE_ANON_KEY,
                "Content-Type": file.content_type,
            },
            data=body,
            timeout=(5, 30),
        )
        response.raise_for_status()
    except Exception as e:
        # in case that our Supabase Storage upload fails
        return {"errors": str(e)}

    return {"url": f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{file.filename}"}
