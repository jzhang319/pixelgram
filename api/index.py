# Entrypoint for Vercel's Python runtime. It discovers the WSGI app via the
# module-level `app` name and wraps it as a serverless function; all actual
# routes live in the `app` package (see app/__init__.py).
from app import app
