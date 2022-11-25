from flask_wtf import FlaskForm
from wtforms.fields import StringField, URLField, IntegerField, BooleanField
from wtforms.validators import Length, DataRequired, NumberRange, URL


class CreateUpdateHoundForm(FlaskForm):
    name = StringField('Name', validators=[Length(min=1, max=75), DataRequired()])
    description = StringField('Description', validators=[Length(min=1, max=2000), DataRequired()])
    age = IntegerField('Age', validators=[NumberRange(min=1), DataRequired()])
    spayed_neutered = BooleanField('Spayed or Neutered', validators=[DataRequired()])
    img_url = URLField('Image URL', validators=[DataRequired(), URL()])