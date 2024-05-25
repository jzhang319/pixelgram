from app.models import db, User, environment, SCHEMA
from sqlalchemy import text

def seed_users():
    static_url_prefix = '/profile_images/'

    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-1.jpeg'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-2.png'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-3.jpeg'
    )
    dave = User(
        username='dave', email='dave@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-4.png'
    )
    stan = User(
        username='stan', email='stan@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-5.png'
    )
    winston = User(
        username='winston', email='winston@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-6.png'
    )
    jess = User(
        username='jess', email='jess@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-7.png'
    )
    candie = User(
        username='candie', email='candie@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-8.png'
    )
    mario = User(
        username='mario', email='mario@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-9.png'
    )
    liugi = User(
        username='liugi', email='liugi@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-10.png'
    )
    bowser = User(
        username='bowser', email='bowser@aa.io', password='password', profile_url=f'{static_url_prefix}profile_image-4.png'
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

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
