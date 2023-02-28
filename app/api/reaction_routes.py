from flask import Blueprint, request, jsonify
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


@reaction_routes.route('/', methods=['GET'])
# @login_required
def get_reactions_all_photos():
    all_reactions = Reaction.query.all()

    # print(list(all_reactions), ' <----- reactions from backend')
    # return list(all_reactions)
    return {'reactions': [reaction.to_dict() for reaction in all_reactions]}


@reaction_routes.route('/photos/<int:id>', methods=['GET'])
def get_reaction_single_photo(id):
    reaction_check = Reaction.query.filter_by(photo_id=id)
    if reaction_check:
        return {'reaction': [reaction.to_dict() for reaction in reaction_check]}
    else:
        return {'message': 'No reaction found'}


@reaction_routes.route('/photos/<int:id>', methods=['POST'])
@login_required
def add_reaction_to_photo(id):
    reaction_check = Reaction.query.filter(
        Reaction.photo_id == id,
        Reaction.user_id == current_user.id
    ).first()

    if reaction_check:
        db.session.delete(reaction_check)
        db.session.commit()
        return {'message': 'Reaction deleted'}
    else:
        new_vote = Reaction(photo_id=id, user_id=current_user.id)
        db.session.add(new_vote)
        db.session.commit()
        return new_vote.to_dict()
