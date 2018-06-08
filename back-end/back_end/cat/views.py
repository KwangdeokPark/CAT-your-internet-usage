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


class UserDetail(generics.RetrieveAPIView):
    queryset = CatUser.objects.all()
    serializer_class = CatUserSerializer

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=self.request.data.get('username'))
        catuser = CatUser.objects.get(user=user)
        serialized = CatUserSerializer(instance=catuser).data
        serialized['user'] = {'username': catuser.user.username}
        serialized['setting'] = SettingSerializer(instance=catuser.setting).data
        serialized['timeline'] = TimelineSerializer(instance=catuser.timeline).data
        return Response(serialized, status=200)

@api_view(['GET', 'PUT'])
@csrf_exempt
def user_detail(request, user_id):
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
        catuser.last_record_time = request.data['last_record_time']
        if request.data.get('today_spent_time', None) != None:
            catuser.today_spent_time = request.data['today_spent_time']
        if request.data.get('now_start_time', None) != None:
            catuser.now_start_time = request.data['now_start_time']
        serialized = CatUserSerializer(instance=catuser).data
        serialized['username'] = catuser.user.username
        serialized['setting'] = SettingSerializer(instance=catuser.setting).data
        serialized['timeline'] = TimelineSerializer(instance=catuser.timeline).data
        serialized['user'] = {'username': catuser.user.username}
        serialized['setting_id'] = SettingSerializer(instance=catuser.setting).data['id']
        serialized['timeline_id'] = TimelineSerializer(instance=catuser.timeline).data['id']
        catuser.save()
        return Response(serialized, status=200)

@api_view(['GET'])
@csrf_exempt
def user_group_detail(request, user_id):
    if request.method == "GET":
        user = User.objects.get(id=user_id)
        catuser = CatUser.objects.get(user=user)
        groups = []
        for i in list(Join.objects.filter(catuser_id=catuser.pk)):
            groups.append(GroupSerializer(Group.objects.get(id=i.group_id)).data)
            members = groups[-1]['members']
            for j in range(0, len(members)):
                members[j] = CatUser.objects.get(id=members[j]).user.username
        return Response(groups, status=200)

@api_view(['POST'])
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.data)
        if form.is_valid():
            user = form.save()
            user.catuser.age = form.cleaned_data.get('age')
            user.catuser.today_spent_time = 0
            user.catuser.now_start_time = timezone.localtime()
            user.catuser.last_record_time = timezone.localtime()
            user.catuser.timeline = Timeline.objects.create(sun_average=0, mon_average=0,
                                                            tue_average=0, wed_average=0,
                                                            thu_average=0, fri_average=0,
                                                            sat_average=0,
                                                            sun_count=0, mon_count=0, tue_count=0, wed_count=0,
                                                            thu_count=0, fri_count=0, sat_count=0)
            user.catuser.setting = Setting.objects.create(
                alert_start_time=(form.cleaned_data.get('alert_start_time'))*1000*60*60,
                alert_interval=(form.cleaned_data.get('alert_interval'))*1000*60)
            user.catuser.save()
            all_group, created1 = Group.objects.get_or_create(name='all_user')
            all_group_obj = Join.objects.create(group=all_group, catuser=user.catuser)
            all_group_obj.save()
            age = request.data['age']
            if age == '0':
                name = '10세 이하'
            elif age == '100':
                name = '100세 이상'
            else:
                name = str(age) + '대'
            age_group, created2 = Group.objects.get_or_create(name=name)
            age_group_obj = Join.objects.create(group=age_group, catuser=user.catuser)
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
    if request.method == "POST":
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            encoded_token = jwt.encode({'username':username, 'password':password}, 'SECRET', algorithm='HS256')
            user = User.objects.get(username=request.data['username'])
            catuser = CatUser.objects.get(user=user)
            serialized = CatUserSerializer(instance=catuser).data
            serialized['username'] = username
            serialized['user'] = {'username': catuser.user.username}
            serialized['setting_id'] = SettingSerializer(instance=catuser.setting).data['id']
            serialized['timeline_id'] = TimelineSerializer(instance=catuser.timeline).data['id']
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
        catuser = CatUser.objects.get(user=User.objects.get(id=user_id))
        timeline = catuser.timeline
        timeline.sun_average = int(request.data['sun_average'])
        timeline.mon_average = int(request.data['mon_average'])
        timeline.tue_average = int(request.data['tue_average'])
        timeline.wed_average = int(request.data['wed_average'])
        timeline.thu_average = int(request.data['thu_average'])
        timeline.fri_average = int(request.data['fri_average'])
        timeline.sat_average = int(request.data['sat_average'])
        timeline.sun_count = int(request.data['sun_count'])
        timeline.mon_count = int(request.data['mon_count'])
        timeline.tue_count = int(request.data['tue_count'])
        timeline.wed_count = int(request.data['wed_count'])
        timeline.thu_count = int(request.data['thu_count'])
        timeline.fri_count = int(request.data['fri_count'])
        timeline.sat_count = int(request.data['sat_count'])
        timeline.total_average = (timeline.sun_average + timeline.mon_average
                                  + timeline.tue_average + timeline.wed_average
                                  + timeline.thu_average + timeline.fri_average
                                  + timeline.sat_average) / 7
        timeline.save()
        catuser.timeline = timeline
        catuser.save()
        return Response(TimelineSerializer(catuser.timeline).data, status=200)

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
        percent = (1 - (all_user.index(catuser) / len(all_user))) * 100
        '''
        print(step)
        for i in range(0,len(all_user)):
            print(TimelineSerializer(all_user[i].timeline).data)
            if all_user[i].timeline.total_average >= tmp * step:
                print(tmp)
                num[tmp] = i
                tmp = tmp + 1
        stats = [0] * 10
        for i in range(0, 10):
            stats[i] = ((num[i+1] - num[i]) / len(all_user)) * 100'''
        stats = [0] * 11
        for i in all_user:
            time = (i.timeline.total_average - min_time) / step
            stats[int(time)] += 1
        stats[9] += stats[10]
        user_time = int((catuser.timeline.total_average - min_time) / step)
        if user_time != 10:
            user_bin = user_time + 1
        else:
            user_bin = user_time
        '''
        for i in all_user:
            if i != catuser:
                time = i.timeline.total_average
                if time <= step:
                    stats[0] = stats[0] + 1
                elif time <= step * 2:
                    stats[1] = stats[1] + 1
                elif time <= step * 3:
                    stats[2] = stats[2] + 1
                elif time <= step * 4:
                    stats[3] = stats[3] + 1
                elif time <= step * 5:
                    stats[4] = stats[4] + 1
                elif time <= step * 6:
                    stats[5] = stats[5] + 1
                elif time <= step * 7:
                    stats[6] = stats[6] + 1
                elif time <= step * 8:
                    stats[7] = stats[7] + 1
                elif time <= step * 9:
                    stats[8] = stats[8] + 1
                else:
                    stats[9] = stats[9] + 1
            else:
                time = i.timeline.total_average
                if time <= step:
                    stats[0] = stats[0] + 1
                    user_bin = 1
                elif time <= step * 2:
                    stats[1] = stats[1] + 1
                    user_bin = 2
                elif time <= step * 3:
                    stats[2] = stats[2] + 1
                    user_bin = 3
                elif time <= step * 4:
                    stats[3] = stats[3] + 1
                    user_bin = 4
                elif time <= step * 5:
                    stats[4] = stats[4] + 1
                    user_bin = 5
                elif time <= step * 6:
                    stats[5] = stats[5] + 1
                    user_bin = 6
                elif time <= step * 7:
                    stats[6] = stats[6] + 1
                    user_bin = 7
                elif time <= step * 8:
                    stats[7] = stats[7] + 1
                    user_bin = 8
                elif time <= step * 9:
                    stats[8] = stats[8] + 1
                    user_bin = 9
                else:
                    stats[9] = stats[9] + 1
                    user_bin = 10'''
        return Response({'group_name': group.name,
                         'percentage': percent,
                         'max': max_time,
                         'min': min_time,
                         'user_bin': user_bin,
                         'bin1': stats[0],
                         'bin2': stats[1],
                         'bin3': stats[2],
                         'bin4': stats[3],
                         'bin5': stats[4],
                         'bin6': stats[5],
                         'bin7': stats[6],
                         'bin8': stats[7],
                         'bin9': stats[8],
                         'bin10': stats[9]}, status=200)
@api_view(['GET', 'PUT'])
@csrf_exempt
def setting_detail(request, user_id):
    print(request.data)
    if request.method == "GET":
        serialized = SettingSerializer(instance=CatUser.objects.get(user=User.objects.get(id=user_id)).setting).data
        return Response(serialized, status=200)
    elif request.method == "PUT":
        catuser = CatUser.objects.get(user=User.objects.get(id=user_id))
        setting = catuser.setting
        setting.alert_interval = request.data['alert_interval']
        setting.alert_start_time = request.data['alert_start_time']
        setting.save()
        catuser.setting = setting
        catuser.save()

        return Response(SettingSerializer(catuser.setting).data, status=200)


@api_view(['GET', 'POST'])
@csrf_exempt
def group_all(request):
    if request.method == "GET":
        groups = []
        for group in Group.objects.all():
            groups.append(GroupSerializer(group).data)
            members = groups[-1]['members']
            for j in range(0, len(members)):
                members[j] = CatUser.objects.get(id=members[j]).user.username
        print(groups)
        return Response(groups, status=200)
    elif request.method == "POST":
        print(request.data)
        if not(list(Group.objects.filter(name=request.data.get('name')))):
            # add new group
            new_group = Group.objects.create(name=request.data.get('name'),
                                             description=request.data.get('description'))
            Join.objects.create(group=new_group, catuser=CatUser.objects.get(id=request.data.get('user_id')))
            new_group.save()
            serialized = GroupSerializer(new_group).data
            serialized['members'] = [CatUser.objects.get(id=request.data.get('user_id')).user.username]
            return Response(serialized, status=200)
        else:
            print(list(Group.objects.filter(name=request.data.get('name'))))
            return Response(status=400)

@api_view(['GET', 'PUT'])
@csrf_exempt
def group_detail(request, group_id):
    if request.method == "GET":
        group = GroupSerializer(Group.objects.get(id=group_id)).data
        members = group['members']
        for j in range(0, len(members)):
            members[j] = CatUser.objects.get(id=members[j]).user.username
        print(group)
        return Response(group, status=200)
    elif request.method == "PUT":
        # add new user
        group = Group.objects.get(id=group_id)
        user = CatUser.objects.get(id=request.data.get('user_id'))
        if not(list(group.members.filter(group__join__catuser=user))):
            join = Join.objects.create(group=group, catuser=user)
            join.save()
            group = GroupSerializer(Group.objects.get(id=group_id)).data
            members = group['members']
            for j in range(0, len(members)):
                members[j] = CatUser.objects.get(id=members[j]).user.username
            return Response(group, status=200)
        else:
            return Response(status=400)

@api_view(['DELETE'])
@csrf_exempt
def group_delete(request, group_id, user_id):
    if request.method == "DELETE":
        # delete user
        user = CatUser.objects.get(id=user_id)
        group = Group.objects.get(id=group_id)
        if list(Join.objects.filter(group=group, catuser=user)):
            Join.objects.filter(group=group, catuser=user).delete()
            return Response(status=200)
        else:
            #cannot find
            return Response(status=400)
@api_view(['GET'])
@csrf_exempt
def group_stat(request, group_id):
    if request.method == "GET":
        group = Group.objects.get(id=group_id)
        all_group = list(Group.objects.all())
        print(all_group)
        all_time = []
        #for i in range(0, len(all_group)):
            #all_group[i] = GroupSerializer(all_group[i]).data
        for i in range(0, len(all_group)):
            time = 0
            members = GroupSerializer(all_group[i]).data['members']
            print(members)
            for member in members:
                time += CatUser.objects.get(id=member).timeline.total_average
            all_time.append(time / len(members))
            if all_group[i] == group:
                group_time = all_time[-1]
        print(all_time)
        min_time = min(all_time)
        max_time = max(all_time)
        step = (max_time - min_time) / 10
        index = 0
        for time in all_time:
            if time > group_time:
                index += 1
        percent = (index / len(all_time)) * 100
        stats = [0] * 11
        for i in all_time:
            time = (i - min_time) / step
            stats[int(time)] += 1
        stats[9] += stats[10]
        group_index = int((group_time - min_time) / step)
        if group_index != 10:
            group_bin = group_index + 1
        else:
            group_bin = group_index
        return Response({'group_name': group.name,
                         'percentage': percent,
                         'max': max_time,
                         'min': min_time,
                         'user_bin': group_bin,
                         'bin1': stats[0],
                         'bin2': stats[1],
                         'bin3': stats[2],
                         'bin4': stats[3],
                         'bin5': stats[4],
                         'bin6': stats[5],
                         'bin7': stats[6],
                         'bin8': stats[7],
                         'bin9': stats[8],
                         'bin10': stats[9]}, status=200)


