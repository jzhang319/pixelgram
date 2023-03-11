from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from app.forms import EditPhotoForm, AddPhotoForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


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


@photo_routes.route("/<int:id>", methods=['GET'])
def get_photo(id):
    my_photo = Photo.query.get(id)
    return my_photo.to_dict()


@photo_routes.route('/<int:photoId>', methods=['PUT'])
@login_required
def edit_photo(photoId):
    form = EditPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_photo = Photo.query.get(photoId)
        if edit_photo.user_id == current_user.id:
            edit_photo.caption = form.data['caption']
            db.session.commit()
            return edit_photo.to_dict()
        else:
            return {'message': 'You are not allowed to edit this photo'}
    # print('Unable to validate', form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}


@photo_routes.route('/', methods=['GET'])
def get_photos():
    all_photos = Photo.query.order_by(Photo.id.desc()).all()
    # print(list(all_photos), ' <---- backend')
    return {'photos': [photo.to_dict() for photo in all_photos]}


@photo_routes.route('/', methods=['POST'])
@login_required
def post_photo():
    form = AddPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_photo = Photo(
            url=form.data['url'],
            caption=form.data['caption'],
            user_id=current_user.id)
        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@photo_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Photo(user=current_user, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

@photo_routes.route('/<int:photoId>', methods=['DELETE'])
@login_required
def delete_photo(photoId):
    del_photo = Photo.query.get(photoId)
    if del_photo.user_id == current_user.id:
        db.session.delete(del_photo)
        db.session.commit()
        return {'message': 'Photo deleted'}
    else:
        return {'message': 'You are not the author of this photo'}


@photo_routes.route('/explore/', methods=['GET'])
@login_required
def explore_photos():
    all_photos_except_self = Photo.query.filter(
        ~Photo.user_id.in_([current_user.id])).all()
    # print(all_photos_except_self, ' <---- backend')
    return {'photos': [photo.to_dict() for photo in all_photos_except_self]}


@photo_routes.route('/followings/', methods=['GET'])
@login_required
def get_followings_self():
    curr_user = User.query.filter_by(id=current_user.id).first()
    # print(dict(curr_user.user_followings), ' <-------- current user')
    all_followings_self = Photo.query.filter(
        ~Photo.user_id.in_(curr_user.user_followings)
    )
    return {'photos': [photo.to_dict() for photo in all_followings_self]}
