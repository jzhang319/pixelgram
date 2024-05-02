from app.models import db, User, Photo, environment, SCHEMA
from sqlalchemy import text

# Adds a demo user, you can add other users here if you want
def seed_photos():
    demo = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235667338104279151/Z.png?ex=66353462&is=6633e2e2&hm=2a1d60fa2cbe9de8f936105a47bb48137e136f2f3cae9d7c73279432b35adbf3&', caption='I cant believe I got this laptop!', user_id=1
    )
    demo1 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235667694041301042/2Q.png?ex=663534b7&is=6633e337&hm=1f3a2eab7ffbc778c61117273d36ce74ffd29923c69b9cc24b48efd3c53fec3a&', caption='This is a nice view!', user_id=1
    )
    demo2 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235667978700197948/images.png?ex=663534fb&is=6633e37b&hm=307e0f4927fe4721999a73afe2fd5e95c8a667f7916b344aa3420c0cc3c4415b&', caption='I would love to swim in this', user_id=2
    )
    demo3 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235668370930667641/Z.png?ex=66353559&is=6633e3d9&hm=5d0613e14d959bd65bf23a44abdc8ef80646699f7a8ad626a8fbda7d32341bda&', caption='How can they actually built this?!', user_id=2
    )
    demo4 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235668655497285632/9k.png?ex=6635359d&is=6633e41d&hm=4036712d58f22430ad55e7d15eda15965f23ae386a12c0ba08debc424a5d55a1&', caption='This is magnificent', user_id=3
    )
    demo5 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235668828810379375/2Q.png?ex=663535c6&is=6633e446&hm=c56c8f8a688652631275e5c8812ce3a3dc2b45b6041f3457ae101933ef806179&', caption='Would love to drive this one day', user_id=3
    )
    demo6 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669007982526484/2Q.png?ex=663535f1&is=6633e471&hm=f429ffb2b16ad3dd5bb4559114c89bf8b4b2618317ab96bdca317e4b3568d05c&', caption='Nice car!!!', user_id=4
    )
    demo7 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669144033169478/images.png?ex=66353611&is=6633e491&hm=ef808e09f772bc26c3a8fa478dd38589ac5b4db9042687fab54857382f67e5fb&', caption=f"Everyone's dream", user_id=5
    )
    demo8 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669291219554497/Z.png?ex=66353634&is=6633e4b4&hm=14b1e96ca2cb99da664909fd25ca93a3e7118fc3c531b95886e4ff5b21d49170&', caption='A flying car', user_id=5
    )
    demo9 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669430361395261/9k.png?ex=66353655&is=6633e4d5&hm=d47e33d354447d8ecd4e9384780d1044b57699e71f697f92aeb56dd20dda908b&', caption='I live there', user_id=6
    )
    demo10 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669532849213481/9k.png?ex=6635366e&is=6633e4ee&hm=f3b6cdaf14b4419e8da4f32734ca5b3d8a2451be4d023030a3a91d2b9e24db52&', caption="I cannot wait" ,user_id=7
    )
    demo11 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669692161720401/9k.png?ex=66353694&is=6633e514&hm=55c5f411e27a4dc9a378bba14be5916253e16be432ec5dc7d550a0fe94430a3f&', caption="nice tree", user_id=8
    )
    demo12 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235669846406991963/2Q.png?ex=663536b9&is=6633e539&hm=6a436255610990f2c25c76db92708170bb6aa30e8d7a60ab49606e3312a81098&', caption='Sky view', user_id=8
    )
    demo13 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235670002812583977/2Q.png?ex=663536de&is=6633e55e&hm=ee27b02c79f50faf02742af2f4da822a6f5f04a84968eb7aad0ba2d214759baa&', caption='Working here would be nice', user_id=9
    )
    demo14 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235670264688283799/9k.png?ex=6635371c&is=6633e59c&hm=9599547aa70f26cc756c26a585314a40dbec4ccc6687864464e8c6eb5a8492a7&', caption='nice plane', user_id=9
    )
    demo15 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235670387606683789/9k.png?ex=6635373a&is=6633e5ba&hm=a96097615aa68c2916f88de03d32363074a8fb95730d11a257805fadb1bb31a0&', caption='love vacations', user_id=10
    )
    demo16 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235670487716069499/9k.png?ex=66353751&is=6633e5d1&hm=b601e0a629efaeb4c2548f1bd912a465922d260ac525358d8d893bec0203e4a3&', caption='my new toy', user_id=10
    )
    demo17 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235670602833203261/9k.png?ex=6635376d&is=6633e5ed&hm=d37c322b56468ddbe1de0b82064ff22cac495b9043db731f534acdba4dac7cee&', caption='dream cruises', user_id=11
    )
    demo18 = Photo(
        url='https://cdn.discordapp.com/attachments/885032629299212308/1235670723339751576/9k.png?ex=6635378a&is=6633e60a&hm=6171176d87b0e4200c1f7704f4237bd5382b1186ea4a8179601ae39e00a830b0&', caption='best time ever', user_id=11
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
