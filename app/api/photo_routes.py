from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload

from flask_login import current_user, login_user, logout_user, login_required

photo_routes = Blueprint('photos', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@photo_routes.route('/', methods=['GET'])
def get_photos():
    all_photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in all_photos]}
