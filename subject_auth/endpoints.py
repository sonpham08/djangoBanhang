from django.urls import include, path
# from rest_framework import routers
from djangodkdt.routers import SharedAPIRootRouter

from .api import MeViewSet

router = SharedAPIRootRouter()
router.register('users', MeViewSet)