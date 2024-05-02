from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy import text

# Adds a demo user, you can add other users here if you want
def seed_reactions():
    demo = Reaction(
        user_id=1, photo_id=4
    )
    demo1 = Reaction(
        user_id=1, photo_id=5
    )
    demo2 = Reaction(
        user_id=1, photo_id=6
    )
    demo3 = Reaction(
        user_id=1, photo_id=7
    )
    demo4 = Reaction(
        user_id=1, photo_id=8
    )
    demo5 = Reaction(
        user_id=1, photo_id=9
    )
    demo6 = Reaction(
        user_id=2, photo_id=1
    )
    demo7 = Reaction(
        user_id=2, photo_id=2
    )
    demo8 = Reaction(
        user_id=2, photo_id=3
    )

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reactions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
