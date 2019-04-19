from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    fullname = models.CharField(max_length=255)
    is_staff_gun = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    phone = models.CharField(max_length=12,default='unknow')
    address = models.CharField(max_length=255, default='unknow')
    cmnd = models.CharField(max_length=15, default='unknow')