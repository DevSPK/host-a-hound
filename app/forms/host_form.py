from flask_wtf import FlaskForm
from wtforms.fields import StringField, FloatField, URLField
from wtforms.validators import Length, DataRequired, NumberRange, URL


class CreateUpdateHostForm(FlaskForm):
    name = StringField('Name', validators=[Length(min=1, max=75), DataRequired()])
    about = StringField('About', validators=[Length(min=1, max=2000), DataRequired()])
    address = StringField('Address', validators=[Length(min=1, max=150), DataRequired()])
    city = StringField('City', validators=[Length(min=1, max=75), DataRequired()])
    state = StringField('State', validators=[Length(min=1, max=25), DataRequired()])
    country = StringField('Country', validators=[Length(min=1, max=50), DataRequired()])
    lat = FloatField("Latitude", validators=[NumberRange(min=-90, max=90), DataRequired()])
    lng = FloatField("Longitude", validators=[NumberRange(min=-180, max=180), DataRequired()])
    price_per_night = FloatField('Price per night', validators=[NumberRange(min=0), DataRequired()])
    img_url = URLField('Image URL', validators=[DataRequired(), URL()])