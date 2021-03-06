from rest_framework import serializers
from cat.models import CatUser, Group, Timeline, Setting, Join

class CatUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatUser
        fields = ('id',
                  'user',
                  'age',
                  'today_spent_time',
                  'now_start_time',
                  'last_record_time',
                  'setting',
                  'timeline',)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id',
                  'name',
                  'description',
                  'members',)

class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ('id',
                  'sun_average',
                  'sun_count',
                  'mon_average',
                  'mon_count',
                  'tue_average',
                  'tue_count',
                  'wed_average',
                  'wed_count',
                  'thu_average',
                  'thu_count',
                  'fri_average',
                  'fri_count',
                  'sat_average',
                  'sat_count',
                  'total_average')

class SettingSerializer(serializers.ModelSerializer):
   class Meta:
       model = Setting
       fields = ('id',
                 'alert_start_time',
                 'alert_interval',)

class JoinSerializer(serializers.ModelSerializer):
    catuser = serializers.ReadOnlyField(source='catuser.id')
    group = serializers.ReadOnlyField(source='group.id')
    class Meta:
        model = Join
        fields = ('catuser',
                  'group',)
