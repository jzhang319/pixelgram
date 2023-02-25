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
def get_all_reaction():
    all_reactions = Reaction.query.all()

    print(list(all_reactions), ' <----- reactions from backend')
    # return list(all_reactions)
    return {'reactions': [reaction.to_dict() for reaction in all_reactions]}
