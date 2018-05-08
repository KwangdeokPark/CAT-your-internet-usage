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
