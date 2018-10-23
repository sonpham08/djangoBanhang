from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Subject,Student,Teacher,SubjectField
from .serializers import SubjectSerializer,StudentSerializer,TeacherSerializer,SubjectFieldSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset=Teacher.objects.all()
    permission_classes=[permissions.IsAuthenticated, ]
    serializer_class=TeacherSerializer

class SubjectFieldViewSet(viewsets.ModelViewSet):
    queryset=SubjectField.objects.all()
    permission_classes=[permissions.IsAuthenticated, ]
    serializer_class=SubjectFieldSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = SubjectSerializer
    # def get_queryset(self):
    #     """
    #     Optionally restricts the returned purchases to a given user,
    #     by filtering against a `username` query parameter in the URL.
    #     """
    #     queryset = Subject.objects.all()
    #     username = self.request.query_params.get('username', None)
    #     if username is not None:
    #         queryset = queryset.filter(pk=2)
    #     return queryset

    @action(detail=False)
    def interested_students(self,request):
        try:
            res=[]
            subjects=Subject.objects.all()
            for subject in subjects:
                students=Student.objects.all().filter(interests__id=subject.id)
                res.append({
                    "id":subject.id,
                    "name":subject.name,
                    "status":subject.status,
                    "register_at":subject.register_at,
                    "deadline_at":subject.deadline_at,
                    "interested_student":[{
                        "id":student.user.id,
                        "username":student.user.username
                    }for student in students]
                })
            return Response(res,200)
        except Exception as e:
            res={
                "Error":repr(e)
            }
            return Response(res,400)



class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StudentSerializer


   