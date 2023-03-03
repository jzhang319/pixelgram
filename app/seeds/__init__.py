from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .reactions import seed_reactions, undo_reactions
# from .followers import seed_followers, undo_followers

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_photos()
        undo_comments()
        undo_reactions()
        # undo_followers()
        db.session.commit()
    seed_users()
    # Add other seed functions here
    seed_photos()
    seed_comments()
    seed_reactions()
    # seed_followers()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_photos()
    undo_comments()
    undo_reactions()
    # undo_followers()
