from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from app.forms import EditPhotoForm, AddPhotoForm


from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/<int:photoId>', methods=['GET'])
# @login_required
def get_all_comments(photoId):
    comments = Comment.query.filter_by(photo_id=photoId).all()
    print(comments, ' <----- comments from backend')
    return {'comments': [comment.to_dict() for comment in comments]}



