import eventlet
eventlet.monkey_patch()

import requests
import os
import uuid

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
BUCKET_NAME = "pixelgram"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "svg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):

    try:
        response = requests.post(
            f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{file.filename}",
            headers={
                "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
                "apikey": SUPABASE_ANON_KEY,
                "Content-Type": file.content_type,
            },
            data=file.read(),
        )
        response.raise_for_status()
    except Exception as e:
        # in case that our Supabase Storage upload fails
        return {"errors": str(e)}

    return {"url": f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{file.filename}"}
