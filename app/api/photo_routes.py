from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from app.forms import EditPhotoForm

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

@photo_routes.route('/<int:photo_id>', methods=['PUT'])
@login_required
def edit_photo(photo_id):
    form = EditPhotoForm()
    form['csrf_token'] = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_photo = Photo.query.get(photo_id)
        form.populate_obj(edit_photo)
        db.session.commit()
        return edit_photo.to_dict()
    print('Unable to validate', form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}

@photo_routes.route('/', methods=['GET'])
def get_photos():
    all_photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in all_photos]}


@photo_routes.route('/<int:photo_id>', methods=['GET'])
@login_required
def get_photo(photo_id):
    my_photo = Photo.query.get(photo_id)
    # return {'photo': my_photo.to_dict()}
    return my_photo.to_dict()
