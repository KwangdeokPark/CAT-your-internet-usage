from cat.models import CatUser, Group, Setting, Timeline, Join
from cat.serializers import CatUserSerializer, GroupSerializer, SettingSerializer, TimelineSerializer, JoinSerializer
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError


class SingUp(generics.ListCreateAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer


class SignIn(generics.ListAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer


from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect

from cat.forms import SignUpForm

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            '''
            age = form.cleaned_data.get('age')
            alert_start_time = form.cleaned_data.get('alert_start_time')
            alert_interval = form.cleaned_data.get('alert_interval')
            Setting.objects.create('alert_start_time'=alert_start_time, )
            '''
            login(request, user)
            return redirect('signup')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})
