from flask_wtf import FlaskForm
from wtforms.fields import FloatField, DateField
from wtforms.validators import DataRequired, NumberRange


class CreateUpdateBookingForm(FlaskForm):
    start_date = DateField("Start Date", validators=[DataRequired()])
    end_date = DateField("End Date", validators=[DataRequired()])
    cost = FloatField("Cost", validators=[NumberRange(min=0), DataRequired()])
