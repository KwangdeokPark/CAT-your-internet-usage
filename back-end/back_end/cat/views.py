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

#temp
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

@api_view(['GET', 'PUT'])
@csrf_exempt
def user_detail(request, user_id):
    print(request.data)
    if request.method == "GET":
        user = User.objects.get(id=user_id)
        catuser = CatUser.objects.get(user=user)
        serialized = CatUserSerializer(instance=catuser).data
        serialized['username'] = catuser.user.username
        serialized['setting'] = SettingSerializer(instance=catuser.setting).data
        serialized['timeline'] = TimelineSerializer(instance=catuser.timeline).data
        serialized['user'] = {'username': catuser.user.username}
        serialized['setting_id'] = SettingSerializer(instance=catuser.setting).data['id']
        serialized['timeline_id'] = TimelineSerializer(instance=catuser.timeline).data['id']
        return Response(serialized, status=200)
    elif request.method == "PUT":
        catuser = CatUser.objects.get(user=User.objects.get(id=user_id))
        if request.data.get('today_spent_time', None) != None:
            catuser.today_spent_time = request.data['today_spent_time']
        catuser.last_record_time = request.data['last_record_time']
        if request.data.get('now_start_time', None) != None:
            catuser.now_start_time = request.data['now_start_time']
        serialized = CatUserSerializer(instance=catuser).data
        serialized['username'] = catuser.user.username
        serialized['setting'] = SettingSerializer(instance=catuser.setting).data
        serialized['timeline'] = TimelineSerializer(instance=catuser.timeline).data
        serialized['user'] = {'username': catuser.user.username}
        serialized['setting_id'] = SettingSerializer(instance=catuser.setting).data['id']
        serialized['timeline_id'] = TimelineSerializer(instance=catuser.timeline).data['id']
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
            all_group, created1 = Group.objects.get_or_create(name='all_user')
            #all_group.members.add(user.catuser)
            all_group_obj = Join.objects.create(group=all_group, catuser=user.catuser)
            print(JoinSerializer(all_group_obj).data)
            all_group_obj.save()
            age_group, created2 = Group.objects.get_or_create(name=request.data['age'])
            #age_group.members.add(user.catuser)
            age_group_obj = Join.objects.create(group=age_group, catuser=user.catuser)
            print(JoinSerializer(age_group_obj).data)
            age_group_obj.save()
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

@api_view(['GET', 'PUT'])
@csrf_exempt
def timeline_total(request, user_id):
    print(request.data)
    if request.method == "GET":
        serialized = TimelineSerializer(instance=CatUser.objects.get(user=User.objects.get(id=user_id)).timeline).data
        return Response(serialized, status=200)
    elif request.method == "PUT":
        timeline = CatUser.objects.get(user=User.objects.get(id=user_id)).timeline
        timeline.sun_average = request.data['sun_average']
        timeline.mon_average = request.data['mon_average']
        timeline.tue_average = request.data['tue_average']
        timeline.wed_average = request.data['wed_average']
        timeline.thu_average = request.data['thu_average']
        timeline.fri_average = request.data['fri_average']
        timeline.sat_average = request.data['sat_average']
        timeline.sun_count = request.data['sun_count']
        timeline.mon_count = request.data['mon_count']
        timeline.tue_count = request.data['tue_count']
        timeline.wed_count = request.data['wed_count']
        timeline.thu_count = request.data['thu_count']
        timeline.fri_count = request.data['fri_count']
        timeline.sat_count = request.data['sat_count']
        timeline.total_average = (timeline.sun_average + timeline.mon_average
                                  + timeline.tue_average + timeline.wed_average
                                  + timeline.thu_average + timeline.fri_average
                                  + timeline.sat_average) / 7
        return Response(status=200)

@api_view(['GET'])
@csrf_exempt
def timeline_detail(request, user_id, group_id):
    if request.method == "GET":
        print(request.data)
        #CatUser.objects.filter(user=User.objects.get(id=user_id)).order_by()
        user = User.objects.get(id=user_id)
        catuser = CatUser.objects.get(user=user)
        group = Group.objects.get(id=group_id)
        #all_user = list(CatUser.objects.filter(group=group).order_by('timeline__total_average'))
        all_user = list(group.members.order_by('timeline__total_average'))
        #for item in all_user:
            #item = CatUserSerializer(item)
        #print(all_user[0].timeline.total_average)
        min_time = all_user[0].timeline.total_average
        max_time = all_user[-1].timeline.total_average
        step = (max_time - min_time) / 10
        num = [0] * 12  #[0, (1/10), (2/10), ... (9/10), (10/10)]
        percent = (1 - (all_user.index(catuser) / len(all_user))) * 100
        tmp = 1
        print(step)
        for i in range(0,len(all_user)):
            if all_user[i].timeline.total_average >= tmp * step:
                print(tmp)
                num[tmp] = i
                tmp = tmp + 1
        stats = [0] * 10
        for i in range(0, 10):
            stats[i] = ((num[i+1] - num[i]) / len(all_user)) * 100
        return Response({'percentage': percent,
                         'max': max_time,
                         'min': min_time,
                         '1': stats[0],
                         '2': stats[1],
                         '3': stats[2],
                         '4': stats[3],
                         '5': stats[4],
                         '6': stats[5],
                         '7': stats[6],
                         '8': stats[7],
                         '9': stats[8],
                         '10': stats[9]}, status=200)
@api_view(['GET', 'PUT'])
@csrf_exempt
def setting_detail(request, user_id):
    print(request.data)
    if request.method == "GET":
        serialized = SettingSerializer(instance=CatUser.objects.get(user=User.objects.get(id=user_id)).setting).data
        return Response(serialized, status=200)
    elif request.method == "PUT":
        item = CatUser.objects.get(user=User.objects.get(id=user_id)).setting
        item.alert_interval = request.data['alert_interval']
        item.alert_start_time = request.data['alert_start_time']
        return Response(status=200)


