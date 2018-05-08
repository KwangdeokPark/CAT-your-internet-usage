from rest_framework import serializers
from cat.models import CatUser, Group, Timeline, Setting, Join

class CatUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatUser
        fields = ('id',
                  'username',
                  'password',
                  'age',
                  'today_spent_time',
                  'now_spent_time',
                  'last_record_date',)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id',
                  'group_name',
                  'description',)

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
                  'sat_count',)
