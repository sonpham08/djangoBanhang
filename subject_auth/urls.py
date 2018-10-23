from django.urls import include, path
from django.conf.urls import url
from .views import students, teachers

from subjects.views import home,index
from django.views.generic.base import TemplateView
from .views.students import home

urlpatterns = [
    path('', home, name='home'),
    path('rest-auth/', include('rest_auth.urls')),
]
