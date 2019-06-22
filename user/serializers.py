
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Logging
from rest_framework.validators import UniqueValidator

from djoser.conf import settings as djoser_settings
from stream_chat import StreamChat
from django.conf import settings
from djoser.serializers import TokenSerializer

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

    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.password = validated_data.get('password', instance.password)
    #     instance.save()

    #     return instance

class StreamTokenSerializer(TokenSerializer):
    stream_token = serializers.SerializerMethodField()

    class Meta:
        model = djoser_settings.TOKEN_MODEL
        fields = ('auth_token','stream_token')

    def get_stream_token(self, obj):
        client = StreamChat(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)
        token = client.create_token(obj.user.id)

        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','fullname', 'email', 'is_staff_gun','is_user','phone', 'address', 'cmnd')

class LoggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logging
        fields = "__all__"