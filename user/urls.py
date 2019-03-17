from django.urls import include, path
from django.conf.urls import url
from .views import home
from django.views.generic.base import TemplateView

urlpatterns = [
    path('', home, name='home'),
    path('rest-auth/', include('rest_auth.urls')),
]
