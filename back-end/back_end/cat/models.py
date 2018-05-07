from django.db import models
from django.contrib.auth.models import User

# Create your models here.

AGE_CHOICE = (
    ('0', '0~19'),
    ('20', '20~29'),
    ('30', '30~39'),
    ('40', '40~')
)

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
    description = TextField(blank = True)
    members = models.ManyToManyField(User, through = 'Join')

    class Meta:
        ordering = ('name',)
