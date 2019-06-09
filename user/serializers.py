
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Logging
from rest_framework.validators import UniqueValidator
User = get_user_model()

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','email', 'password', 'fullname', 'is_staff_gun', 'is_user','phone',
        'address', 'cmnd')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # user = User.objects.create_user(validated_data['username'],
        #                                 None,
        #                                 validated_data['password'],)
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'],
                                        validated_data['fullname'],
                                        validated_data['is_staff_gun'],
                                        validated_data['is_user'],
                                        validated_data['phone'],
                                        validated_data['address'],
                                        validated_data['cmnd'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','fullname', 'email', 'is_staff_gun','is_user','phone', 'address', 'cmnd')

class LoggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logging
        fields = "__all__"