from cat.models import CatUser, Group, Setting, Timeline, Join
from cat.serializers import CatUserSerializer, GroupSerializer, SettingSerializer, TimelineSerializer, JoinSerializer
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from datetime import datetime, timedelta

'''
class SingUp(generics.ListCreateAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer


class SignIn(generics.ListAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer
'''

from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
import datetime
from django.utils import timezone


from cat.forms import SignUpForm, SignInForm

from django.views.generic.base import TemplateView

from django.http import HttpResponse

#from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

class mainview(TemplateView):
    template_name = 'main.html'

#@ensure_csrf_cookie
@api_view(['POST'])
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        print(request.data)
        form = SignUpForm(request.data)
        print(form)
        if form.is_valid():
            user = form.save()
            '''
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user1 = authenticate(username=username, password=raw_password)
            '''
            user.catuser.age = form.cleaned_data.get('age')
            print(form.cleaned_data.get('age'))
            print(request.POST['age'])
            user.catuser.today_spent_time = datetime.timedelta(minutes=0)
            user.catuser.now_start_time = timezone.now()
            user.catuser.last_record_time = timezone.now()
            user.catuser.timeline = Timeline.objects.create(sun_average=timedelta(), mon_average=timedelta(), tue_average=timedelta(), wed_average=timedelta(), thu_average=timedelta(), fri_average=timedelta(), sat_average=timedelta(),
                                                            sun_count=0, mon_count=0, tue_count=0, wed_count=0, thu_count=0, fri_count=0, sat_count=0)
            user.catuser.setting = Setting.objects.create(alert_start_time=datetime.timedelta(hours=form.cleaned_data.get('alert_start_time')), alert_interval=datetime.timedelta(minutes=form.cleaned_data.get('alert_interval')))
            user.catuser.save()
            '''
            age = form.cleaned_data.get('age')
            alert_start_time = form.cleaned_data.get('alert_start_time')
            alert_interval = form.cleaned_data.get('alert_interval')
            catuser = CatUser.objects.create(user=user,
                                             age=age,
                                             today_spent_time=datetime.timedelta(minutes=0),
                                             now_start_time=timezone.now(),
                                             last_record_time=timezone.now(),
                                             timeline=Timeline.objects.create(sun_average=timedelta(), mon_average=timedelta(), tue_average=timedelta(), wed_average=timedelta(), thu_average=timedelta(), fri_average=timedelta(), sat_average=timedelta(),
                                                                              sun_count=0, mon_count=0, tue_count=0, wed_count=0, thu_count=0, fri_count=0, sat_count=0),
                                             setting=Setting.objects.create(alert_start_time=datetime.timedelta(hours=alert_start_time), alert_interval=datetime.timedelta(minutes=alert_interval)))
                                             
            catuser.save()
            '''
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user1 = authenticate(username=username, password=raw_password)
            login(request, user1)

            return redirect('signin')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

def signin(request):
    if request.method == "POST":
        form = SignInForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        print(CatUser.objects.get(user=User.objects.get(username=username)).age)
        if user is not None:
            login(request, user)
            return redirect('main')
        else:
            return HttpResponse('로그인 실패. 다시 시도 해보세요.')
    else:
        form = SignInForm()
        return render(request, 'signin.html', {'form': form})
