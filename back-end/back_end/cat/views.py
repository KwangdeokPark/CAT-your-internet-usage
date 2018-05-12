from cat.models import CatUser, Group, Setting, Timeline, Join
from cat.serializers import CatUserSerializer, GroupSerializer, SettingSerializer, TimelineSerializer, JoinSerializer
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from datetime import datetime, timedelta

from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
import datetime
from django.utils import timezone

from cat.forms import SignUpForm, SignInForm

from django.views.generic.base import TemplateView

from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


class mainview(TemplateView):
    template_name = 'main.html'

@api_view(['POST'])
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        print(request.data)
        form = SignUpForm(request.data)
        print(form)
        if form.is_valid():
            user = form.save()
            user.catuser.age = form.cleaned_data.get('age')
            print(user.catuser.age)
            user.catuser.today_spent_time = datetime.timedelta(minutes=0)
            print(user.catuser.today_spent_time)
            user.catuser.now_start_time = timezone.localtime()
            print(user.catuser.now_start_time)
            user.catuser.last_record_time = timezone.localtime()
            print(user.catuser.last_record_time)
            user.catuser.timeline = Timeline.objects.create(sun_average=timedelta(), mon_average=timedelta(),
                                                            tue_average=timedelta(), wed_average=timedelta(),
                                                            thu_average=timedelta(), fri_average=timedelta(),
                                                            sat_average=timedelta(),
                                                            sun_count=0, mon_count=0, tue_count=0, wed_count=0,
                                                            thu_count=0, fri_count=0, sat_count=0)
            print(user.catuser.timeline)
            user.catuser.setting = Setting.objects.create(
                alert_start_time=datetime.timedelta(hours=form.cleaned_data.get('alert_start_time')),
                alert_interval=datetime.timedelta(minutes=form.cleaned_data.get('alert_interval')))
            print(user.catuser.setting)
            user.catuser.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user1 = authenticate(username=username, password=raw_password)
            login(request, user1)

            return redirect('signin')
    else:
        form = SignUpForm()
    return redirect('signin')
    #return render(request, 'signup.html', {'form': form})


@api_view(['POST', 'GET'])
@csrf_exempt
def signin(request):
    if request.method == "POST":
        print(request.data)
        form = SignInForm(request.data)
        print(form)
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        print(user)

        if user is not None:
            print(CatUser.objects.get(user=User.objects.get(username=username)).age)
            login(request, user)
            return redirect('main')
        else:
            return redirect('signin')
            #return HttpResponse('로그인 실패. 다시 시도 해보세요.')
    else:
        form = SignInForm()
        return render(request, 'signin.html', {'form': form})

