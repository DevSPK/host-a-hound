from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import User, db, Host
from ..forms.host_form import CreateUpdateHostForm
from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from .auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

host_routes = Blueprint("host", __name__)


@host_routes.get("/test")
def test_route():
    return "host"


@host_routes.get("/")
def get_hosts():
    """
    Query for all hosts and returns them in a list of host dictionaries
    """

    hosts = Host.query.all()
    return {"hosts": [host.to_dict() for host in hosts]}


@host_routes.get("/<int:id>")
def get_host_by_id(id):
    """
    Query hosts by host id and returns the host
    """

    host = Host.query.get(id)

    if not host:
        return {"message": "Host could not be found"}, 404

    return host.to_dict()


# @host_routes.post("/")
# @login_required
# def create_host():
#     """
#     Posts new host
#     """
#     form = CreateUpdateHostForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         new_host = Host(
#             user_id=current_user.get_id(),
#             name=form.data["name"],
#             about=form.data["about"],
#             address=form.data["address"],
#             city=form.data["city"],
#             state=form.data["state"],
#             country=form.data["country"],
#             lat=form.data["lat"],
#             lng=form.data["lng"],
#             price_per_night=form.data["price_per_night"],
#             img_url=form.data["img_url"],
#         )
#         db.session.add(new_host)
#         db.session.commit()

#         print("this is new_host", new_host)

#         created_host = {
#             "id": new_host.id,
#             "user_id": current_user.get_id(),
#             "about": new_host.about,
#             "address": new_host.address,
#             "city": new_host.city,
#             "state": new_host.state,
#             "country": new_host.country,
#             "lat": new_host.lat,
#             "lng": new_host.lng,
#             "price_per_night": new_host.price_per_night,
#             "img_url": new_host.img_url,
#         }

#         return new_host.to_dict()
#     else:
#         return {"errors": validation_errors_to_error_messages(form.errors)}, 400

from app.s3_helpers import upload_file_to_s3

@host_routes.post("/")
@login_required
def create_host():
    form = CreateUpdateHostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print("first if")
    print("this is reqsuest.files", request.files)

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    print("second if")

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    print("this is image.filename", image.filename)

    upload = upload_file_to_s3(image)

    print("this is upload", upload)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    if form.validate_on_submit():
        # Check if an image file is included in the form data
        if "image" not in request.files:
            return {"errors": "image required"}, 400

        # Get the uploaded image file from the form data
        image = request.files["image"]

        # Check if the file type is allowed
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        # Generate a unique filename for the image
        image.filename = get_unique_filename(image.filename)

        # Upload the image file to AWS S3
        upload = upload_file_to_s3(image)

        # Check if the upload was successful
        if "url" not in upload:
            return upload, 400

        # Retrieve the URL of the uploaded image from the upload dictionary
        img_url = upload["url"]

        new_host = Host(
            user_id=current_user.get_id(),
            name=form.data["name"],
            about=form.data["about"],
            address=form.data["address"],
            city=form.data["city"],
            state=form.data["state"],
            country=form.data["country"],
            lat=form.data["lat"],
            lng=form.data["lng"],
            price_per_night=form.data["price_per_night"],
            img_url=img_url,
        )
        db.session.add(new_host)
        db.session.commit()

        # Create a dictionary with the details of the created host
        created_host = {
            "id": new_host.id,
            "user_id": current_user.get_id(),
            "about": new_host.about,
            "address": new_host.address,
            "city": new_host.city,
            "state": new_host.state,
            "country": new_host.country,
            "lat": new_host.lat,
            "lng": new_host.lng,
            "price_per_night": new_host.price_per_night,
            "img_url": new_host.img_url,
        }

        return new_host.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400



@host_routes.put("/<int:host_id>")
@login_required
def edit_host(host_id):
    """
    Edit host by host id
    """
    form = CreateUpdateHostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        current_host = Host.query.get(host_id)
        print(current_host)
        if current_host == None:
            return {"message": "Host could not be found"}, 404

        if current_host.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403

        current_host.name = form.data["name"]
        current_host.about = form.data["about"]
        current_host.address = form.data["address"]
        current_host.city = form.data["city"]
        current_host.state = form.data["state"]
        current_host.country = form.data["country"]
        current_host.lat = form.data["lat"]
        current_host.lng = form.data["lng"]
        current_host.price_per_night = form.data["price_per_night"]
        current_host.img_url = form.data["img_url"]

        db.session.commit()

        return current_host.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@host_routes.delete("/<int:id>")
@login_required
def delete_host(id):
    """
    Delete a host by host id
    """
    current_host = Host.query.get(id)

    if current_host == None:
        return {"message": "Host could not be found"}, 404

    if current_host.user_id != int(current_user.get_id()):
        return {"message": "Forbidden"}, 403

    db.session.delete(current_host)
    db.session.commit()

    return {"message": "Successfully deleted"}
