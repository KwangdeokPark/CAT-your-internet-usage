from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
from datetime import datetime


from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.

AGE_CHOICE = (
    ('0', '0~19'),
    ('20', '20~29'),
    ('30', '30~39'),
    ('40', '40~')
)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Setting(models.Model):
    alert_start_time = models.DurationField()
    alert_interval = models.DurationField()

class Timeline(models.Model):
    sun_average = models.DurationField(default=timedelta())
    sun_count = models.PositiveIntegerField(default=0)
    mon_average = models.DurationField(default=timedelta())
    mon_count = models.PositiveIntegerField(default=0)
    tue_average = models.DurationField(default=timedelta())
    tue_count = models.PositiveIntegerField(default=0)
    wed_average = models.DurationField(default=timedelta())
    wed_count = models.PositiveIntegerField(default=0)
    thu_average = models.DurationField(default=timedelta())
    thu_count = models.PositiveIntegerField(default=0)
    fri_average = models.DurationField(default=timedelta())
    fri_count = models.PositiveIntegerField(default=0)
    sat_average = models.DurationField(default=timedelta())
    sat_count = models.PositiveIntegerField(default=0)

class CatUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.CharField(choices=AGE_CHOICE, max_length=100)
    today_spent_time = models.DurationField(null=True)
    now_start_time = models.DateTimeField(null=True)
    last_record_time = models.DateTimeField(null=True)
    setting = models.OneToOneField(Setting, null=True, on_delete=models.CASCADE)
    timeline = models.OneToOneField(Timeline, null=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ('user',)

from django.db.models.signals import post_save
from django.dispatch import receiver
@receiver(post_save, sender=User)
def update_catuser(sender, instance, created, **kwargs):
    if created:
        print(instance)
        CatUser.objects.create(user=instance)
    instance.catuser.save()


class Group(models.Model):
    name = models.CharField(blank=True, max_length=30)
    description = models.TextField(blank=True)
    members = models.ManyToManyField(CatUser, through='Join')

    class Meta:
        ordering = ('name',)

class Join(models.Model):
    catuser = models.ForeignKey(CatUser, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_join = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('date_join',)


class UserTest(models.Model):
    username = models.CharField(max_length=20)
    today_spent_time = models.DurationField(default=timedelta(microseconds=0))
    now_start_time = models.DateTimeField(default=datetime.now())
    last_record_time = models.DateTimeField(default=datetime.now())

