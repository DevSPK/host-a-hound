from app.models import db, User, environment, SCHEMA, Host, Hound, Booking
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username="demo", email="demo@aa.io", password="password")
    wilma = User(username="wilma", email="wilma@aa.io", password="password")
    barney = User(username="barney", email="barney@aa.io", password="password")

    users = [demo, wilma, barney]

    for user in users:
        db.session.add(user)
        db.session.commit()

    seed_hosts = [
        {
            "user_id": 2,
            "name": "Wilma's Dog Destination",
            "about": "A great place for your dog to stay while you enjoy your trip away!",
            "address": "3564 Weber Drive",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 58.88,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-716674445310682476/original/3dbb1597-6ac6-4877-bb08-7188742b8203.jpeg",
        },
        {
            "user_id": 1,
            "name": "Fred's Place",
            "about": "Wonderful place for all dogs!",
            "address": "3280 Marcelo Plaza",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 75.44,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-715411481162208357/original/a875bbe4-8549-4ba4-abe8-179066c9a9ab.jpeg",
        },
        {
            "user_id": 3,
            "name": "Barney's Beautiful Dog Hotel",
            "about": "Wonderful place for all dogs!",
            "address": "9501 Yolanda Road",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 99.99,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-47771464/original/e8f6758f-1348-43f6-832a-066a90523068.jpeg",
        },
        {
            "user_id": 2,
            "name": "Wilma's Puppy Palace",
            "about": "Perfect place for your puppy to stay and be pampered!",
            "address": "3563 Weber Drive",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 55.25,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-715401606875304002/original/f720bb71-9bd0-42d2-abc1-9ff2817fb18a.jpeg",
        },
        {
            "user_id": 1,
            "name": "Fred's Hound Hotel",
            "about": "Perfect place for your hounds to roam with lots of protected outdoor space!",
            "address": "3282 Marcelo Plaza",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 80.99,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-43425222/original/f3dfdfad-00e0-4b81-93bf-50cc2167dd9a.png",
        },
        {
            "user_id": 3,
            "name": "Barney's Water Wonderland",
            "about": "Perfect for dogs who love the water!",
            "address": "951 Yolanda Road",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 101.33,
            "img_url": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-722408789066131629/original/83cd6729-13ed-43a6-86fb-166eba8a03ac.jpeg",
        },
        {
            "user_id": 2,
            "name": "Wilma's Suburban Paradise",
            "about": "Wonderful place for dogs who need the security of suburbia",
            "address": "3464 Weber Drive",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 50.00,
            "img_url": "https://a0.muscache.com/im/pictures/2d502704-5db1-47c0-bfee-3816d04743fb.jpg",
        },
        {
            "user_id": 1,
            "name": "Fred's Desert Destination",
            "about": "Amazing spot for dog's who enjoy a desert climate",
            "address": "3285 Marcelo Plaza",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 75.55,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/36deb313-d961-4cea-b9e1-045bb5907ec7.jpeg",
        },
        {
            "user_id": 3,
            "name": "Barney's Beach Base",
            "about": "This is the place for dogs who love sand, sun, and seaside fun!",
            "address": "9240 Yolanda Road",
            "city": "Washington",
            "state": "DC",
            "country": "USA",
            "lat": 38.889248,
            "lng": -77.050636,
            "price_per_night": 100.25,
            "img_url": "https://a0.muscache.com/im/pictures/miso/Hosting-666128575441248875/original/814eda14-be08-4acd-8dcb-703e15efc6f9.jpeg",
        },
    ]

    for host in seed_hosts:
        new_host = Host(
            user_id=host["user_id"],
            name=host["name"],
            about=host["about"],
            address=host["address"],
            city=host["city"],
            state=host["state"],
            country=host["country"],
            lat=host["lat"],
            lng=host["lng"],
            price_per_night=host["price_per_night"],
            img_url=host["img_url"],
        )
        db.session.add(new_host)
        db.session.commit()

    seed_hounds = [
        {
            "owner_id": 3,
            "name": "Bingo",
            "age": 5,
            "spayed_neutered": True,
            "description": "Bingo loves to lay around and be pampered",
            "img_url": "https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191030212452971_COVER.jpg",
        },
        {
            "owner_id": 2,
            "name": "Sammy",
            "age": 6,
            "spayed_neutered": False,
            "description": "Sammy loves to be outside.",
            "img_url": "https://images.dog.ceo/breeds/clumber/n02101556_2677.jpg",
        },
        {
            "owner_id": 1,
            "name": "Luna",
            "age": 2,
            "spayed_neutered": True,
            "description": "Luna loves the water!",
            "img_url": "https://images.dog.ceo/breeds/saluki/n02091831_3222.jpg",
        },
        {
            "owner_id": 3,
            "name": "Bailey",
            "age": 7,
            "spayed_neutered": True,
            "description": " Bailey needs love and attention.",
            "img_url": "https://images.dog.ceo/breeds/labradoodle/lola.jpg",
        },
        {
            "owner_id": 2,
            "name": "Leo",
            "age": 9,
            "spayed_neutered": False,
            "description": "Leo lives a life of luxury and comfort. ",
            "img_url": "https://images.dog.ceo/breeds/beagle/n02088364_16165.jpg",
        },
        {
            "owner_id": 1,
            "name": "Winston",
            "age": 4,
            "spayed_neutered": True,
            "description": "Winston needs room to run.",
            "img_url": "https://images.dog.ceo/breeds/hound-english/n02089973_2404.jpg",
        },
        {
            "owner_id": 3,
            "name": "Dino",
            "age": 10,
            "spayed_neutered": True,
            "description": "Dino likes to run around outside.",
            "img_url": "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_7219.jpg",
        },
        {
            "owner_id": 2,
            "name": "Grogu",
            "age": 2,
            "spayed_neutered": False,
            "description": "Grogu loves to play dress-up.",
            "img_url": "https://images.dog.ceo/breeds/terrier-irish/n02093991_594.jpg",
        },
        {
            "owner_id": 1,
            "name": "Eggo",
            "age": 6,
            "spayed_neutered": True,
            "description": "Eggo is the life of the party!",
            "img_url": "https://images.dog.ceo/breeds/boxer/n02108089_1560.jpg",
        },
        {
            "owner_id": 3,
            "name": "Zoom",
            "age": 2,
            "spayed_neutered": True,
            "description": "Zoom doesn't deal with change well so we want a familiar setting.",
            "img_url": "https://images.dog.ceo/breeds/chow/n02112137_5664.jpg",
        },
        {
            "owner_id": 2,
            "name": "Apollo",
            "age": 1,
            "spayed_neutered": True,
            "description": "Apollo loves the beach!",
            "img_url": "https://images.dog.ceo/breeds/segugio-italian/n02090722_001.jpg",
        },
        {
            "owner_id": 1,
            "name": "Tex",
            "age": 11,
            "spayed_neutered": True,
            "description": "Tex is friendly and enjoys the outdoors.",
            "img_url": "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_4751.jpg",
        },
    ]

    for hound in seed_hounds:
        new_hound = Hound(
            owner_id=hound["owner_id"],
            name=hound["name"],
            age=hound["age"],
            spayed_neutered=hound["spayed_neutered"],
            description=hound["description"],
            img_url=hound["img_url"],
        )
        db.session.add(new_hound)
        db.session.commit()

    seed_bookings = [
        {
            "host_id": 1,
            "hound_id": 1,
            "start_date": date(2023, 5, 15),
            "end_date": date(2023, 5, 22),
            "cost": 528.08,
        },
        {
            "host_id": 1,
            "hound_id": 2,
            "start_date": date(2023, 4, 15),
            "end_date": date(2023, 4, 22),
            "cost": 528.08,
        },
        {
            "host_id": 1,
            "hound_id": 3,
            "start_date": date(2023, 6, 15),
            "end_date": date(2023, 6, 22),
            "cost": 528.08,
        },
        {
            "host_id": 1,
            "hound_id": 4,
            "start_date": date(2023, 7, 15),
            "end_date": date(2023, 7, 22),
            "cost": 528.08,
        },
        {
            "host_id": 1,
            "hound_id": 5,
            "start_date": date(2023, 8, 15),
            "end_date": date(2023, 8, 22),
            "cost": 528.08,
        },
        {
            "host_id": 1,
            "hound_id": 2,
            "start_date": date(2023, 8, 15),
            "end_date": date(2023, 8, 22),
            "cost": 528.08,
        },
    ]

    for booking in seed_bookings:
        new_booking = Booking(
            host_id=booking["host_id"],
            hound_id=booking["hound_id"],
            start_date=booking["start_date"],
            end_date=booking["end_date"],
            cost=booking["cost"],
        )

        db.session.add(new_booking)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM hosts")
        db.session.execute("DELETE FROM hounds")
        db.session.execute("DELETE FROM bookings")
        

    db.session.commit()
