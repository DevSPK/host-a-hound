from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, db, Hound
from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from .auth_routes import validation_errors_to_error_messages

hound_routes = Blueprint("hound", __name__)


@hound_routes.get("/test")
def test_route():
    return "hound"
