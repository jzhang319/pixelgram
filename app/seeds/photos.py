from app.models import db, User, Photo, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_photos():
    demo = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075453154847629372/How-to-Choose-a-Laptop-Gear-GettyImages-1235728903.png', caption='I cant believe I got this laptop!', user_id=1, username='Demo'
    )
    demo1 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075453638597693480/mountains-7ddde89.png', caption='This is a nice view!', user_id=1, username='Demo'
    )
    demo2 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075453917929934869/THE-10-BEST-PARKS-IN-BROOKLYN.png', caption='I would love to swim in this', user_id=2, username='marnie'
    )
    demo3 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075454258415149147/GettyImages-1235814282.png', caption='How can they actually built this?!', user_id=2, username='marnie'
    )
    demo4 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075454532995260476/photo-1429041966141-44d228a42775.png', caption='This is magnificent', user_id=3, username='bobbie'
    )
    demo5 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075454803150372864/CES-2023-PEUGEOT_INCEPTION_CONCEPT_2301CN202.png', caption='Would love to drive this one day', user_id=3, username='bobbie'
    )
    demo6 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075455109389099090/1661888151-DAL500017.png', caption='Nice car!!!', user_id=4, username='dave'
    )
    demo7 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075455330135330816/960x0.png', caption=f"Everyone's dream", user_id=5, username='stan'
    )
    demo8 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075455689280991242/maxresdefault.png', caption='A flying car', user_id=5, username='stan'
    )
    demo9 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075455992915046430/201231114619-01-oz-ourdomain-student-housing-super-169.png', caption='I live there', user_id=6, username='winston'
    )
    demo10 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075456456725385216/maxresdefault.png', caption='tallest buildings', user_id=7, username='jess'
    )
    demo11 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075456781590986832/shutterstock_783317635-e1673245880444-1520x855.png', caption="nice tree", user_id=8, username='candie'
    )
    demo12 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075456979226591383/21a7af1782ac440dbf1c0c93b1e21b0b.png', caption='Sky view', user_id=8, username='candie'
    )
    demo13 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075457164241551441/8C8856378-130905-burj-khalifa-9a.png', caption='Working here would be nice', user_id=9, username='mario'
    )
    demo14 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075457686885380176/airplane-cartoon-1301493.png', caption='nice plane', user_id=9, username='mario'
    )
    demo15 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075457987201736734/1000px-2021-weekend-cruises-norwegian-sky_2_0.png', caption='love vacations', user_id=10, username='liugi'
    )
    demo16 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075458126427463710/3-142937e1bf7198.png', caption='my new toy', user_id=10, username='liugi'
    )
    demo17 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075458259735027722/20220310_082441-scaled.png', caption='dream cruises', user_id=11, username='bowser'
    )
    demo18 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1075458406741192746/RCI_WN_032022_CC_JGraham_Day_Aer.png', caption='best time ever', user_id=11,  username='bowser'
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
        db.session.execute("DELETE FROM photos")

    db.session.commit()
