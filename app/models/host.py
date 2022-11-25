from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime


class Host(db.Model):
    __tablename__ = 'hosts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(75), nullable=False)
    about = db.Column(db.String(2000), nullable=False)
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(75), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    lat = db.Column(db.Float, nullable=False, default=38.907192)
    lng = db.Column(db.Float, nullable=False, default=-77.036873)
    price_per_night = db.Column(db.Float, nullable=False)
    img_url= db.Column(db.String(2048), nullable=False)


    user = db.relationship('User', back_populates='hosts')

    def to_dict(self):
        host_dict = {
          "id": self.id,
          "user_id": self.user_id,
          "name": self.name,
          "about": self.about,
          "address": self.address,
          "city": self.city,
          "state": self.state,
          "country": self.country,
          "lat": self.lat,
          "lng": self.lng,
          "price_per_night": self.price_per_night,
          "img_url": self.img_url
        }
        return host_dict
