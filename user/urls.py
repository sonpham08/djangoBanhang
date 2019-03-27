from django.urls import include, path
from django.conf.urls import url
from .views import home
# from .api import RegistrationAPI
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('', home, name='home'),
    path('rest-auth/', include('rest_auth.urls')),
    path('api/users/', views.UserCreate.as_view(), name='account-create'),
]
