from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import datetime


class Hound(db.Model):
    __tablename__ = 'hounds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(75), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    spayed_neutered = db.Column(db.Boolean, nullable=False)
    img_url= db.Column(db.String(2048), nullable=False)


    user = db.relationship('User', back_populates='hounds')

    def to_dict(self):
        hound_dict = {
          "id": self.id,
          "owner_id": self.owner_id,
          "name": self.name,
          "description": self.description,
          "age": self.age,
          "spayed_neutered": self.spayed_neutered,
          "img_url": self.img_url,
        }
        return hound_dict
