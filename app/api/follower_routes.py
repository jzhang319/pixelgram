from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction, Follower
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from app.forms import EditPhotoForm, AddPhotoForm

from flask_login import current_user, login_user, logout_user, login_required

follower_routes = Blueprint('followers', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@follower_routes.route('/', methods=['GET'])
@login_required
def get_all_followings():
    all_followers = Follower.query.all()
    # print(list(all_followers), ' <-----------')
    if all_followers:
        return {'followers': [follower.to_dict() for follower in all_followers]}
    else:
        return {'message': 'No followers found'}


@follower_routes.route('/users/<int:id>', methods=['POST'])
@login_required
def add_follower(id):
    follower_check = Follower.query.filter(
        Follower.user_id == id,
        Follower.follower_id == current_user.id
    ).first()

    if follower_check:
        db.session.delete(follower_check)
        db.session.commit()
        return {'message': 'Follower deleted successfully'}
    else:
        new_follower = Follower(user_id=id, follower_id=current_user.id)
        db.session.add(new_follower)
        db.session.commit()
        return new_follower.to_dict()
