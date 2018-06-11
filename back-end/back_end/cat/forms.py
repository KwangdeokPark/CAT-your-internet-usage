from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    age = forms.IntegerField()
    alert_start_time = forms.IntegerField()
    alert_interval = forms.IntegerField()
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'age', 'alert_start_time', 'alert_interval',)

class SignInForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']
