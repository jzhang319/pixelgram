from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, HiddenField, TextAreaField
from wtforms.validators import DataRequired
from app.models import Comment


class AddCommentForm(FlaskForm):
    comment = TextAreaField('Comment', validators=[DataRequired()])
