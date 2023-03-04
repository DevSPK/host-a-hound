from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .host import Host
from .hound import Hound
from datetime import datetime, date


class Booking(db.Model):
    __tablename__ = "bookings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("hosts.id")))
    hound_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("hounds.id")))
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    cost = db.Column(db.Float, nullable=False)

    host = db.relationship("Host", back_populates="bookings")
    hound = db.relationship("Hound", back_populates="bookings")

    def to_dict(self):
        booking_dict = {
            "id": self.id,
            "host_id": self.host_id,
            "hound_id": self.hound_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "cost": self.cost,
        }
        return booking_dict
