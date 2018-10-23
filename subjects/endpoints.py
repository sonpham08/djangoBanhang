from django.urls import include, path
# from rest_framework import routers
from djangodkdt.routers import SharedAPIRootRouter

from .api import SubjectViewSet,StudentViewSet,TeacherViewSet,SubjectFieldViewSet

router = SharedAPIRootRouter()
router.register('subjects', SubjectViewSet)
router.register('students',StudentViewSet)
router.register('teachers',TeacherViewSet)
router.register('subjectfields',SubjectFieldViewSet)

# urlpatterns = [
#     path("", include(router.urls)),
# ]