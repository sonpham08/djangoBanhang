from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import UserSerializer
User = get_user_model()
from subjects.models import Teacher


class MeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    @action(detail=False)
    def me(self, request):
        req_user = request.user
        try:
            res = {
                "username": req_user.username,
                "id": req_user.id,
                "is_student": req_user.is_student,
                "is_teacher": req_user.is_teacher,
                "is_superuser":req_user.is_superuser
            }

            return Response(res, 200)
        except Exception as e:
            res = {
                "Error": repr(e)
            }
            return Response(res, 400)

    @action(detail=False)
    def listTeacher(self,request):
        try:
            res=[]
            teachers=Teacher.objects.all()
            res.append({
                "teacher":[{
                    "teacher":teacher
                }for teacher in teachers]
            })
            return Response(res,200)
        except Exception as e:
            res={
                "Error":repr(e)
            }
            return Response(res,400)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(purchaser__username=username)
        return queryset

# class MeView(APIView):
#     """
#     View to list all users in the system.

#     * Requires token authentication.
#     * Only admin users are able to access this view.
#     """
#     authentication_classes = (authentication.BasicAuthentication, authentication.SessionAuthentication, )
#     permission_classes = (permissions.IsAuthenticated,)

#     def get(self, request, format=None):
#         """
#         Return a list of all users.
#         """
#         # usernames = [user.username for user in User.objects.all()]
#         req_user = request.user
#         try:
#             res = {
#                 "username": req_user.username,
#                 "id": req_user.id,
#                 "is_student": req_user.is_student,
#                 "is_teacher": req_user.is_teacher
#             }

#             return Response(res, 200)
#         except Exception as e:
#             res = {
#                 "Error": repr(e)
#             }
#             return Response(res, 400)