from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

class Setting(models.Model):
    alert_start_time = models.BigIntegerField(default=0)
    alert_interval = models.BigIntegerField(default=0)

class Timeline(models.Model):
    sun_average = models.BigIntegerField(default=0)
    sun_count = models.PositiveIntegerField(default=0)
    mon_average = models.BigIntegerField(default=0)
    mon_count = models.PositiveIntegerField(default=0)
    tue_average = models.BigIntegerField(default=0)
    tue_count = models.PositiveIntegerField(default=0)
    wed_average = models.BigIntegerField(default=0)
    wed_count = models.PositiveIntegerField(default=0)
    thu_average = models.BigIntegerField(default=0)
    thu_count = models.PositiveIntegerField(default=0)
    fri_average = models.BigIntegerField(default=0)
    fri_count = models.PositiveIntegerField(default=0)
    sat_average = models.BigIntegerField(default=0)
    sat_count = models.PositiveIntegerField(default=0)
    total_average = models.BigIntegerField(default=0)

class CatUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.CharField(max_length=100)
    today_spent_time = models.BigIntegerField(default=0)
    now_start_time = models.DateTimeField(default=datetime.now())
    last_record_time = models.DateTimeField(default=datetime.now())
    setting = models.OneToOneField(Setting, null=True, on_delete=models.CASCADE)
    timeline = models.OneToOneField(Timeline, null=True, on_delete=models.CASCADE)
    class Meta:
        ordering = ('user',)

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


@receiver(post_save, sender=User)
def update_catuser(sender, instance, created, **kwargs):
    if created:
        CatUser.objects.create(user=instance)
    instance.catuser.save()




