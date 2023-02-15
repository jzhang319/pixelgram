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
    demo9 = Comment(
        photo_id=6, comment='i dreamed of having one', user_id=8
    )
    demo10 = Comment(
        photo_id=7, comment='back to the future again', user_id=9
    )
    demo11 = Comment(
        photo_id=8, comment='buuuuuugati', user_id=10
    )
    demo12 = Comment(
        photo_id=9, comment='last thing we need is a flying car', user_id=11
    )
    demo13 = Comment(
        photo_id=10, comment='that is a nice purchase', user_id=11
    )
    demo14 = Comment(
        photo_id=11, comment='nice comparison of size', user_id=3
    )
    demo15 = Comment(
        photo_id=12, comment='i will be there one there', user_id=5
    )
    demo16 = Comment(
        photo_id=13, comment='is this real ?!', user_id=10
    )
    demo17 = Comment(
        photo_id=14, comment='nice pic', user_id=2
    )
    demo18 = Comment(
        photo_id=15, comment='i can draw better than that', user_id=9
    )
    demo19 = Comment(
        photo_id=16, comment='i took a picture like that with a drone before', user_id=8
    )
    demo20 = Comment(
        photo_id=17, comment='that is a small ship', user_id=6
    )
    demo21 = Comment(
        photo_id=18, comment='biiiiig family of boats', user_id=1
    )
    demo22 = Comment(
        photo_id=19, comment='i can spend months on this cruise', user_id=4
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
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
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
