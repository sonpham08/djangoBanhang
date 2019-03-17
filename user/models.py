from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    fullname = models.CharField(max_length=255)

class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    customer_phone = models.CharField(max_length=12)
    mail = models.CharField(max_length=100)
