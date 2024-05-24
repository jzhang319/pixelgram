from app.models import db, User, environment, SCHEMA
from sqlalchemy import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_url='/static/profile_images/profile_image-1.jpeg'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_url='/static/profile_images/profile_image-2.png'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_url='/static/profile_images/profile_image-3.jpeg'
        )
    dave = User(
        username='dave', email='dave@aa.io', password='password', profile_url='/static/profile_images/profile_image-4.png'
        )
    stan = User(
        username='stan', email='stan@aa.io', password='password', profile_url='/static/profile_images/profile_image-5.png'
    )
    winston = User(
        username='winston', email='winston@aa.io', password='password', profile_url='/static/profile_images/profile_image-6.png'
    )
    jess = User(
        username='jess', email='jess@aa.io', password='password', profile_url='/static/profile_images/profile_image-7.png'
    )
    candie = User(
        username='candie', email='candie@aa.io', password='password', profile_url='/static/profile_images/profile_image-8.png'
    )
    mario = User(
        username='mario', email='mario@aa.io', password='password', profile_url='/static/profile_images/profile_image-9.png'
    )
    liugi = User(
        username='liugi', email='liugi@aa.io', password='password', profile_url='/static/profile_images/profile_image-10.png'
    )
    bowser = User(
        username='bowser', email='bowser@aa.io', password='password', profile_url='/static/profile_images/profile_image-4.png'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dave)
    db.session.add(stan)
    db.session.add(winston)
    db.session.add(jess)
    db.session.add(candie)
    db.session.add(mario)
    db.session.add(liugi)
    db.session.add(bowser)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
