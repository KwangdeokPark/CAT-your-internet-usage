from cat.models import CatUser, Group, Setting, Timeline, Join
from cat.serializers import *
from rest_framework import generics
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from django.contrib.auth import login, authenticate
import datetime
from django.utils import timezone
from cat.forms import SignUpForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
'''
class UserDetail(generics.RetrieveAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=self.request.data.get('username'))
        catuser = CatUser.objects.get(user=user)
        print({'username': catuser.user})
        print(SettingSerializer(instance=catuser.setting).data)
        print(TimelineSerializer(instance=catuser.timeline).data)
        print(CatUserSerializer(instance=catuser).data)
        serialized = CatUserSerializer(instance=catuser).data
        serialized['user'] = {'username': catuser.user.username}
        serialized['setting'] = SettingSerializer(instance=catuser.setting).data
        serialized['timeline'] = TimelineSerializer(instance=catuser.timeline).data
        print(serialized)
        return Response(serialized, status=200)
'''

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
            #user.catuser.today_spent_time = datetime.timedelta(minutes=0)
            user.catuser.today_spent_time = 0
            print(user.catuser.today_spent_time)
            user.catuser.now_start_time = timezone.localtime()
            print(user.catuser.now_start_time)
            user.catuser.last_record_time = timezone.localtime()
            print(user.catuser.last_record_time)
            user.catuser.timeline = Timeline.objects.create(sun_average=0, mon_average=0,
                                                            tue_average=0, wed_average=0,
                                                            thu_average=0, fri_average=0,
                                                            sat_average=0,
                                                            sun_count=0, mon_count=0, tue_count=0, wed_count=0,
                                                            thu_count=0, fri_count=0, sat_count=0)
            print(user.catuser.timeline.fri_average)
            user.catuser.setting = Setting.objects.create(
                alert_start_time=(form.cleaned_data.get('alert_start_time'))*1000*60*60,
                alert_interval=(form.cleaned_data.get('alert_interval'))*1000*60)
            print(user.catuser.setting.alert_interval)
            user.catuser.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user1 = authenticate(username=username, password=raw_password)
            login(request, user1)
            return Response(status=200)
        else:
            return Response(status=400)
    else:
        return Response(status=400)

from rest_framework.response import Response
import jwt

@api_view(['POST', 'GET'])
@csrf_exempt
def signin(request):
    print(request.data)
    if request.method == "POST":
        print(request.data)
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        print(user)

        if user is not None:
            encoded_token = jwt.encode({'username':username, 'password':password}, 'SECRET', algorithm='HS256')
            print(encoded_token)
            user = User.objects.get(username=request.data['username'])
            catuser = CatUser.objects.get(user=user)
            print({'username': catuser.user})
            print(SettingSerializer(instance=catuser.setting).data)
            print(TimelineSerializer(instance=catuser.timeline).data)
            print(CatUserSerializer(instance=catuser).data)
            serialized = CatUserSerializer(instance=catuser).data
            serialized['username'] = username
            serialized['user'] = {'username': catuser.user.username}
            serialized['setting_id'] = SettingSerializer(instance=catuser.setting).data['id']
            serialized['timeline_id'] = TimelineSerializer(instance=catuser.timeline).data['id']
            print(serialized)
            print({'user': serialized, 'token': encoded_token})
            return Response({'user': serialized, 'token': encoded_token}, status=200)

        else:
            return Response(status=400)
    else:
        return Response(status=400)

@api_view(['GET'])
@csrf_exempt
def timeline_total(request, user_id):
    print(request.data)
    if request.method == "GET":
        user = User.objects.get(id=user_id)
        timeline = CatUser.objects.get(user=user).timeline
        average = (timeline.mon_average + timeline.tue_average + timeline.wed_average +timeline.thu_average + timeline.fri_average + timeline.sat_average + timeline.sun_average)/7
        return Response({'average': average}, status=200)

@api_view(['GET'])
@csrf_exempt
def timeline_detail(request, user_id, group_id):
    if request.method == "GET":
        print(request.data)

