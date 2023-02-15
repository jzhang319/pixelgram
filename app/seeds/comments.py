from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    demo = Comment(
        photo_id=1, comment='wow i want that one too', user_id=1
    )
    demo1 = Comment(
        photo_id=1, comment='gave it to my bro', user_id=2
    )
    demo2 = Comment(
        photo_id=2, comment='been there', user_id=3
    )
    demo3 = Comment(
        photo_id=2, comment='that is a nice view up there', user_id=4
    )
    demo4 = Comment(
        photo_id=3, comment='i went to central park as well', user_id=5
    )
    demo5 = Comment(
        photo_id=4, comment='i built that long time ago', user_id=5
    )
    demo6 = Comment(
        photo_id=4, comment='haha, with what ? lego ?', user_id=6
    )
    demo7 = Comment(
        photo_id=5, comment='designed from ground up', user_id=7
    )
    demo8 = Comment(
        photo_id=5, comment='inspired', user_id=7
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
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
