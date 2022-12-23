from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, db, Hound
from ..forms.hound_form import CreateUpdateHoundForm
from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from .auth_routes import validation_errors_to_error_messages

hound_routes = Blueprint("hound", __name__)


@hound_routes.get("/test")
def test_route():
    return "hound"


@hound_routes.get("/")
def get_hounds():
    """
    Query for all hounds and returns them in a list of hound dictionaries
    """

    hounds = Hound.query.all()
    return {"hounds": [hound.to_dict() for hound in hounds]}


@hound_routes.get("/<int:id>")
def get_hound_by_id(id):
    """
    Query hounds by hound id and returns the hound
    """

    hound = Hound.query.get(id)

    if not hound:
        return {"message": "Hound could not be found"}, 404

    return hound.to_dict()


@hound_routes.post("/")
@login_required
def create_hound():
    """
    Posts new hound
    """
    form = CreateUpdateHoundForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_hound = Hound(
            user_id=current_user.get_id(),
            name=form.data["name"],
            description=form.data["description"],
            age=form.data["age"],
            spayed_neutered=form.data["spayed_neutered"],
            img_url=form.data["img_url"],
        )
        db.session.add(new_hound)
        db.session.commit()

        print("this is new_hound", new_hound)

        return new_hound.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@hound_routes.put("/<int:hound_id>")
@login_required
def edit_host(hound_id):
    """
    Edit hound by hound id
    """
    form = CreateUpdateHoundForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        current_hound = Hound.query.get(hound_id)
        print(current_hound)
        if current_hound == None:
            return {"message": "Hound could not be found"}, 404

        if current_hound.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403

        current_hound.name = (form.data["name"],)
        current_hound.description = (form.data["description"],)
        current_hound.age = (form.data["age"],)
        current_hound.spayed_neutered = (form.data["spayed_neutered"],)
        current_hound.img_url = form.data["img_url"]

        db.session.commit()

        return current_hound.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@hound_routes.delete("/<int:id>")
@login_required
def delete_hound(id):
    """
    Delete a hound by hound id
    """
    current_hound = Hound.query.get(id)

    if current_hound == None:
        return {"message": "Hound could not be found"}, 404

    if current_hound.user_id != int(current_user.get_id()):
        return {"message": "Forbidden"}, 403

    db.session.delete(current_hound)
    db.session.commit()

    return {"message": "Successfully deleted"}
