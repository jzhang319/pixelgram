from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, HiddenField, TextAreaField
from wtforms.validators import DataRequired


class EditPhotoForm(FlaskForm):
    user_id = HiddenField('User_Id')
    photo_id = HiddenField('Photo_Id')
    caption = TextAreaField('Caption', validators=[DataRequired()])
