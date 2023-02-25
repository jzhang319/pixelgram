from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction
from flask_login import current_user, login_user, logout_user, login_required

reaction_routes = Blueprint('reactions', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
