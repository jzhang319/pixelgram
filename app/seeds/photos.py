from app.models import db, User, Photo, environment, SCHEMA
from sqlalchemy import text

# Adds a demo user, you can add other users here if you want
def seed_photos():
    demo = Photo(
        url='/public/photos/photo1.png', caption='I cant believe I got this laptop!', user_id=1
    )
    demo1 = Photo(
        url='/public/photos/photo2.png', caption='This is a nice view!', user_id=1
    )
    demo2 = Photo(
        url='/public/photos/photo3.png', caption='I would love to swim in this', user_id=2
    )
    demo3 = Photo(
        url='/public/photos/photo4.png', caption='How can they actually built this?!', user_id=2
    )
    demo4 = Photo(
        url='/public/photos/photo5.png', caption='This is magnificent', user_id=3
    )
    demo5 = Photo(
        url='/public/photos/photo6.png', caption='Would love to drive this one day', user_id=3
    )
    demo6 = Photo(
        url='/public/photos/photo7.png', caption='Nice car!!!', user_id=4
    )
    demo7 = Photo(
        url='/public/photos/photo8.png', caption=f"Everyone's dream", user_id=5
    )
    demo8 = Photo(
        url='/public/photos/photo9.png', caption='A flying car', user_id=5
    )
    demo9 = Photo(
        url='/public/photos/photo10.png', caption='I live there', user_id=6
    )
    demo10 = Photo(
        url='/public/photos/photo11.png', caption="I cannot wait" ,user_id=7
    )
    demo11 = Photo(
        url='/public/photos/photo12.png', caption="nice tree", user_id=8
    )
    demo12 = Photo(
        url='/public/photos/photo13.png', caption='Sky view', user_id=8
    )
    demo13 = Photo(
        url='/public/photos/photo14.png', caption='Working here would be nice', user_id=9
    )
    demo14 = Photo(
        url='/public/photos/photo15.png', caption='nice plane', user_id=9
    )
    demo15 = Photo(
        url='/public/photos/photo16.png', caption='love vacations', user_id=10
    )
    demo16 = Photo(
        url='/public/photos/photo17.png', caption='my new toy', user_id=10
    )
    demo17 = Photo(
        url='/public/photos/photo18.png', caption='dream cruises', user_id=11
    )
    demo18 = Photo(
        url='/public/photos/photo19.png', caption='best time ever', user_id=11
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
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()
