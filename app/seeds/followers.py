from app.models import db, User, Photo, Follower, environment, SCHEMA
from sqlalchemy import text

def seed_followers():
    demo = Follower(user_id=1, follower_id=2)
    demo1 = Follower(user_id=1, follower_id=3)
    demo2 = Follower(user_id=1, follower_id=4)
    demo3 = Follower(user_id=1, follower_id=5)
    demo4 = Follower(user_id=1, follower_id=6)
    demo5 = Follower(user_id=2, follower_id=1)

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.commit()


def undo_followers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))

    db.session.commit()
