from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, HiddenField, TextAreaField
from wtforms.validators import DataRequired
from app.models import Photo


class AddPhotoForm(FlaskForm):
    user_id = HiddenField('User_Id')
    url = StringField('url', validators=[DataRequired()])
    caption = TextAreaField('Caption', validators=[DataRequired()])
