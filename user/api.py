
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions,generics
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from knox.models import AuthToken
from .serializers import UserSerializer, CreateUserSerializer
from product.models import Coin
# from product.models import Product, DetailOrder
User = get_user_model()
# from .models import User

class MeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAdminUser, ]
    serializer_class = UserSerializer

    @action(detail=False)
    def me(self, request):
        req_user = request.user
        try:
            res = {
                "username": req_user.username,
                "id": req_user.id,
                "is_staff_gun": req_user.is_staff_gun,
                "is_user": req_user.is_user,
                "is_superuser":req_user.is_superuser,
                "fullname": req_user.fullname,
                "email": req_user.email,
                "phone": req_user.phone,
                "address": req_user.address,
                "cmnd": req_user.cmnd
            }
            return Response(res, 200)
        except Exception as e:
            res = {
                "Error": repr(e)
            }
            return Response(res, 400)

    @action(detail=False)
    def get_staff(self, request):
        res=[]
        try:
            users = User.objects.all()
            for user in users:
                if user.is_superuser == False and user.is_staff_gun == True:
                    result = {
                        "username": user.username,
                        "id": user.id,
                        "is_staff_gun": user.is_staff_gun,
                        "is_user": user.is_user,
                        "is_superuser":user.is_superuser,
                        "fullname": user.fullname,
                        "email": user.email,
                        "phone": user.phone,
                        "address": user.address,
                        "cmnd": user.cmnd
                    }
                    res.append(result)
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

    @action(detail=False)
    def get_customer(self, request):
        res=[]
        try:
            users = User.objects.all()
            coins = Coin.objects.all()
            for user in users:
                if user.is_superuser == False and user.is_user == True:
                    result = {
                        "username": user.username,
                        "id": user.id,
                        "is_staff_gun": user.is_staff_gun,
                        "is_user": user.is_user,
                        "is_superuser":user.is_superuser,
                        "fullname": user.fullname,
                        "email": user.email,
                        "phone": user.phone,
                        "address": user.address,
                        "cmnd": user.cmnd,
                        "coin": [{
                            "coin_id": coin.coin_id,
                            "count": coin.count
                        }for coin in coins if coin.user.id == user.id]
                    }
                    res.append(result)
            return Response(res, 200)
        except Exception as e:
            return Response({
                "Error": repr(e)
            }, 400)

class RegistrationAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CreateUserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })