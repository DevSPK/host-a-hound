from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import User, db, Booking, Host, Hound
from ..forms.booking_form import CreateUpdateBookingForm

from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from .auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint("booking", __name__)


@booking_routes.get("/test")
def test_route():
    return "booking"


@booking_routes.get("/")
def get_booking():
    """
    Query for all bookings and returns them in a list of booking dictionaries
    """

    bookings = Booking.query.all()
    return {"bookings": [booking.to_dict() for booking in bookings]}


@booking_routes.get("/<int:id>")
def get_booking_by_id(id):
    """
    Query bookings by booking id and returns the booking
    """

    booking = Booking.query.get(id)

    if not booking:
        return {"message": "Booking could not be found"}, 404

    return booking.to_dict()

@booking_routes.get("/<int:host_id>")
def get_booking_by_host_id(host_id):
    """
    Query bookings by host id and returns the bookings
    """
    
    booking = Booking.query.get(host_id)

    if not booking:
        return {"message": "Booking could not be found"}, 404

    return booking.to_dict()

@booking_routes.get("/<int:hound_id>")
def get_booking_by_hound_id(hound_id):
    """
    Query bookings by hound id and returns the bookings
    """
    
    booking = Booking.query.get(hound_id)

    if not booking:
        return {"message": "Booking could not be found"}, 404

    return booking.to_dict()



@booking_routes.post("/")
@login_required
def create_booking():
    """
    Posts new booking
    """
    form = CreateUpdateBookingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_booking = Booking(
            host_id=form.data["host_id"],
            hound_id=form.data["hound_id"],
            start_date=form.data["start_date"],
            end_date=form.data["end_date"],
            cost=form.data["cost"],
        )
        db.session.add(new_booking)
        db.session.commit()

        print("this is new_booking", new_booking)

        return new_booking.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@booking_routes.put("/<int:booking_id>")
@login_required
def edit_booking(booking_id):
    """
    Edit booking by booking id
    """
    form = CreateUpdateBookingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        current_booking = Booking.query.get(booking_id)
        print(current_booking)
        if current_booking == None:
            return {"message": "Booking could not be found"}, 404

        # if current_booking.user_id != int(current_user.get_id()):
        #     return {"message": "Forbidden"}, 403

        current_booking.host_id = form.data["host_id"]
        current_booking.hound_id = form.data["hound_id"]
        current_booking.start_date = form.data["start_date"]
        current_booking.end_date = form.data["end_date"]
        current_booking.cost = form.data["cost"]

        db.session.commit()

        return current_booking.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@booking_routes.delete("/<int:id>")
@login_required
def delete_booking(id):
    """
    Delete a booking by booking id
    """
    current_booking = Booking.query.get(id)

    if current_booking == None:
        return {"message": "Booking could not be found"}, 404

    db.session.delete(current_booking)
    db.session.commit()

    return {"message": "Successfully deleted"}
