
from django.urls import include, path
from rest_framework import routers
from djangodkdt.routers import SharedAPIRootRouter

from .api import MeViewSet, RegistrationAPI

# router = SharedAPIRootRouter()
router = routers.DefaultRouter()
router.register('users', MeViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", RegistrationAPI.as_view()),
]