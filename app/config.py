import os
from sqlalchemy.pool import NullPool


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = os.environ.get('FLASK_ENV') != 'production'
    # Serverless functions get a fresh process per invocation (no long-lived
    # pool to amortize), and DATABASE_URL already points at Supabase's
    # transaction pooler (port 6543), which does its own pooling -- so don't
    # let SQLAlchemy hold its own idle connections open in production.
    if os.environ.get('FLASK_ENV') == 'production':
        SQLALCHEMY_ENGINE_OPTIONS = {'poolclass': NullPool}