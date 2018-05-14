from cat.models import CatUser, Group, Setting, Timeline, Join
from cat.serializers import *
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
from django.contrib.auth import views
from rest_framework.response import Response

class UserDetail(generics.RetrieveAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=self.request.data.get('username'))
        catuser = CatUser.objects.get(user=user)
        #catuser.user = {'username': catuser.user}
        #CatUserSerializer(instance=catuser).data['user']
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
            print(user.catuser.timeline.fri_average)
            user.catuser.setting = Setting.objects.create(
                alert_start_time=datetime.timedelta(hours=form.cleaned_data.get('alert_start_time')),
                alert_interval=datetime.timedelta(minutes=form.cleaned_data.get('alert_interval')))
            print(user.catuser.setting.alert_interval)
            user.catuser.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user1 = authenticate(username=username, password=raw_password)
            login(request, user1)
            #return redirect('main')
            return Response(status=200)
        else:
            return Response(status=400)
    else:
        #form = SignUpForm()
        return Response(status=400)
    #return Response(status=200)
    #return render(request, 'signup.html', {'form': form})

from rest_framework.response import Response
import jwt,json

from rest_framework_simplejwt.views import TokenObtainPairView

#class MyTokenObtainPairView(TokenObtainPairView):
    #serializer_class = MyTokenObtainPairSerializer

from rest_framework_jwt.settings import api_settings

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
            return Response({'token': encoded_token}, status=200)

        else:
            return Response(status=400)
    else:
        return Response(status=400)
'''
import jwt,json
from rest_framework import views
from rest_framework.response import Response

@csrf_exempt
class signin(views.APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        print(request.data)
        username = request.data['username']
        password = request.data['password']
        try:
            user = User.objects.get(username=username, password=password)
        except User.DoesNotExist:
            return Response({'Error': "Invalid username/password"}, status="400")
        if user:
            payload = {
                'id': user.id,
                'email': user.email,
            }
            jwt_token = {'token': jwt.encode(payload, "SECRET_KEY")}

            return HttpResponse(
                json.dumps(jwt_token),
                status=200,
                content_type="application/json"
                )
        else:
            return Response(
                json.dumps({'Error': "Invalid credentials"}),
                status=400,
                content_type="application/json"
            )'''
