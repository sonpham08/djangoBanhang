
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions,generics
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from knox.models import AuthToken
from .serializers import UserSerializer, CreateUserSerializer
User = get_user_model()

class MeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    @action(detail=False)
    def me(self, request):
        # req_user = request.user
        try:
            res = []
            users = User.objects.all()
            for user in users:
                res.append({
                    "id": user.id,
                    "fullname": user.fullname,
                    "username": user.username,
                    "password": user.password
                })
            return Response(res, 200)
        except Exception as e:
            res = {
                "Error": repr(e)
            }
            return Response(res, 400)

class RegistrationAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CreateUserSerializer
    print('da vao')
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })