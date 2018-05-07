from django.db import models
from django.contrib.auth.models import User

# Create your models here.

AGE_CHOICE = (
    ('0', '0~19'),
    ('20', '20~29'),
    ('30', '30~39'),
    ('40', '40~')
)

class Setting(models.Model):
    alert_start_time = models.DurationField()
    alert_interval = models.DurationField()

class Timeline(models.Model):
    sun_average = models.DurationField()
    sun_count = models.PositiveIntegerField()
    mon_average = models.DurationField()
    mon_count = models.PositiveIntegerField()
    tue_average = models.DurationField()
    tue_count = models.PositiveIntegerField()
    wed_average = models.DurationField()
    wed_count = models.PositiveIntegerField()
    thu_average = models.DurationField()
    thu_count = models.PositiveIntegerField()
    fri_average = models.DurationField()
    fri_count = models.PositiveIntegerField()
    sat_average = models.DurationField()
    sat_count = models.PositiveIntegerField()

class CatUser(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    age = models.CharField(choices=AGE_CHOICE, max_length = 100)
    today_spent_time = models.DurationField()
    now_start_time = models.DateTimeField()
    last_record_time = models.DateTimeField()
    setting = models.OneToOneField(Setting, on_delete = models.CASCADE)
    timeline = models.OneToOneField(Timeline, on_delete = models.CASCADE)

    class Meta:
        ordering = ('user',)

class Group(models.Model):
    name = models.CharField(blank = True, max_length = 30)
    description = models.TextField(blank = True)
    members = models.ManyToManyField(CatUser, through = 'Join')

    class Meta:
        ordering = ('name',)

class Join(models.Model):
    catuser = models.ForeignKey(CatUser, on_delete = models.CASCADE)
    group = models.ForeignKey(Group, on_delete = models.CASCADE)
    date_join = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ('date_join',)
