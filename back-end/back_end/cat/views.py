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

@api_view(['POST'])
def user_test(request):
    
    permission_classes = (permissions.AllowAny, )
    
    if request.method == 'POST':
        serializer = UserTestSerializer(data=request.data)
        if Serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_detail_test(request):
    try:
        user_test = UserTest.objects.get(pk = pk)
    except UsetTest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UserDetailTestSerializer(user_test, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        serializer = UserDetailTestSerializer(user_Test)
        return Response(status=status.HTTP_404_NOT_FOUND)


from rest_framework.response import Response
import jwt,json

from rest_framework_simplejwt.views import TokenObtainPairView

#class MyTokenObtainPairView(TokenObtainPairView):
    #serializer_class = MyTokenObtainPairSerializer

from rest_framework_jwt.settings import api_settings

@api_view(['POST', 'GET'])
@csrf_exempt
def signin(request):
    if request.method == "POST":
        print(request.data)
        #form = SignInForm(request.data)
        #print(form)
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        print(user)

        if user is not None:
            '''
            print(CatUser.objects.get(user=User.objects.get(username=username)).age)
            login(request, user)
            return redirect('signin')'''
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return HttpResponse(token)

        else:
            return Response(
                json.dumps({'Error': "Invalid credentials"}),
                status=400,
                content_type="application/json"
            )
            #return Response({'Error': "Invalid username/password"}, status="400")
            #return redirect('signin')
            #return HttpResponse('로그인 실패. 다시 시도 해보세요.')
    else:
        form = SignInForm()
        return render(request, 'signin.html', {'form': form})

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
