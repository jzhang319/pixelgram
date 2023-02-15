from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/950229895341031585/1073011278878097438/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075447009454071828/allthings.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_url='https://media.discordapp.net/attachments/950229895341031585/1073010684230639636/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png')
    dave = User(
        username='dave', email='dave@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/950229895341031585/1073011083872309418/small-profile.png')
    stan = User(
        username='stan', email='stan@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075447971128299560/17571cdf635b8156272109eaa9cb5900.png'
    )
    winston = User(
        username='winston', email='winston@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075448337345552514/3135715.png'
    )
    jess = User(
        username='jess', email='jess@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075448650496495656/3135823.png'
    )
    candie = User(
        username='candie', email='candie@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075448918315384974/people-profile-icon_24877-40756.png'
    )
    mario = User(
        username='mario', email='mario@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075449241088053339/9k.png'
    )
    liugi = User(
        username='liugi', email='liugi@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075449514896412682/Z.png'
    )
    bowser = User(
        username='bowser', email='bowser@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1075555631139913898/BowserProfile.png'
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
        db.session.execute("DELETE FROM users")

    db.session.commit()
