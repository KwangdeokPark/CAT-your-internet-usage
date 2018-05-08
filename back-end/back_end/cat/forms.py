from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    age = forms.IntegerField()
    #last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    #email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')
    alert_start_time = forms.IntegerField()
    alert_interval = forms.IntegerField()
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'age', 'alert_start_time', 'alert_interval',)
