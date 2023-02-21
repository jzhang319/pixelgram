from flask import Blueprint, request
from app.models import Photo, db, User, Comment, Reaction
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from app.forms import EditPhotoForm, AddPhotoForm, EditCommentForm, AddCommentForm


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
    # print(comments, ' <----- comments from backend')
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:photoId>', methods=['POST'])
@login_required
def add_comment(photoId):
    form = AddCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            comment=form.data['comment'], user_id=current_user.id, photo_id=photoId
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@ comment_routes.route('/<int:commentId>', methods = ['DELETE'])
@ login_required
def delete_comment(commentId):
    del_comment=Comment.query.get(commentId)
    if del_comment.user_id == current_user.id:
        db.session.delete(del_comment)
        db.session.commit()
        return {'message': 'Comment deleted'}
    else:
        return {'message': 'You are not the author of this comment'}


@ comment_routes.route('/<int:commentId>', methods = ['PUT'])
@ login_required
def update_comment(commentId):
    form=EditCommentForm()
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        comment=Comment.query.get(commentId)
        if comment.user_id == current_user.id:
            comment.comment=form.data['comment']
            db.session.commit()
            return comment.to_dict()
        else:
            return {'message': 'You are not the author of this comment'}
    return {'errors': validation_errors_to_error_messages(form.errors)}
