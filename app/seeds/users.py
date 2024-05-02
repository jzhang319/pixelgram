from app.models import db, User, environment, SCHEMA
from sqlalchemy import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235671445661814844/E3iyNtMQ1ksOp1N7mEBY0USRiJW2kvuv3eajzY7sIIgSLHdjBe9frdRbuSckhkIf8Hv1E2luXy6qsAAAAASUVORK5CYII.png?ex=66353836&is=6633e6b6&hm=b4d86434cb61effd49f58afc201be373d38d9966264bb425df65d580308c03ea&'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235671483582382191/images.png?ex=6635383f&is=6633e6bf&hm=30c10b8a208db5e165566dab835e13ad1410dc082313e5cae1892cdfeb31e007&'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235671514309722113/images.png?ex=66353846&is=6633e6c6&hm=1c52b6cd93847a5a8cf3775506cb30cbc8f39685ed2e9a3998980aa04013b931&'
        )
    dave = User(
        username='dave', email='dave@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235671582681075823/images.png?ex=66353856&is=6633e6d6&hm=345584951bd6b9353f6e1f8289cfeeeb1a62569ff7ff315560e79aa56763171b&'
        )
    stan = User(
        username='stan', email='stan@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689341074931843/WGgdHXC6NCL1YbW2llpMfbapjLXhCmhSha7Z20C2Sim0frbaPJ60QcQhTodmDEjB6Z6JbRNLoBOKZPEpcQxWqrsV3fQWc73dB9iv5X0HnQZn270TJdmXjEKezEamuz0d7equ80ml0Oun902zu1Le2243NWGmdD93TAgTv6ArzAAAAABJRU5ErkJggg.png?ex=663548e0&is=6633f760&hm=a852e5a5eb7fd553ca07319ed017400a7e2dcd61446f6b025f5ea5fda655b2c3&'
    )
    winston = User(
        username='winston', email='winston@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689445576020039/images.png?ex=663548f9&is=6633f779&hm=629f2736754d2503e548b9ce29b8be47b1217edf90e8c9d3806629e536d7c3e4&'
    )
    jess = User(
        username='jess', email='jess@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689524244381786/images.png?ex=6635490c&is=6633f78c&hm=534c3689054dc24b8a6a60913889a79f666ee37604bf682c69c1d20a11ccc8f3&'
    )
    candie = User(
        username='candie', email='candie@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689628057604096/images.png?ex=66354925&is=6633f7a5&hm=6a750e5d8eab8e9adf4a617ce21063eba4ba68129a007844570dc2f1fc33979f&'
    )
    mario = User(
        username='mario', email='mario@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689748111167560/9k.png?ex=66354941&is=6633f7c1&hm=c5c64f7fec989101a0c59dfd03697c95f2b1b77d784d4eb9ec6f5bc70520ec53&'
    )
    liugi = User(
        username='liugi', email='liugi@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689878541434970/2Q.png?ex=66354961&is=6633f7e1&hm=2e4e2e5cde608d1d173e3a73d52c5c86ba7fa8adfa5d810fef76549b9b0dda04&'
    )
    bowser = User(
        username='bowser', email='bowser@aa.io', password='password', profile_url='https://cdn.discordapp.com/attachments/885032629299212308/1235689965808128062/2Q.png?ex=66354975&is=6633f7f5&hm=2b8687c5e459bfd1c6943537eddc079c4ba3069c4406b8ee1da4378ae1208d57&'
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
