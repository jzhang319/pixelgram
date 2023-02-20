from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, HiddenField, TextAreaField
from wtforms.validators import DataRequired
from app.models import Photo


class EditPhotoForm(FlaskForm):
    
    caption = TextAreaField('Caption', validators=[DataRequired()])
