
from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.authtoken import views as rest_framework_views
# from subjects import endpoints
from subject_auth.views import students, teachers
from . import routers
from subjects.views import home
# from subjects.views import classroom, students, teachers
import subjects.endpoints
import subject_auth.endpoints

from .views import login
from .views import contact,help

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'api/', include(routers.SharedAPIRootRouter.router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^get_auth_token/$', rest_framework_views.obtain_auth_token, name='get_auth_token'),
    path('', include('subject_auth.urls')),
    path('api/login', login),
    path('contact/', contact, name="contact"),
    path('help/', help, name="help"),
    # path('waitroom/', waitroom, name="waitroom"),

    # path('api/v1/', include('subject_auth.urls')),
    # url(r'^', include('subjects.urls')),
    # url(r'^accounts/', django.contrib.auth.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/signup/', students.SignUpView.as_view(), name='signup'),
    path('accounts/signup/student/', students.StudentSignUpView.as_view(), name='student_signup'),
    path('accounts/signup/teacher/', teachers.TeacherSignUpView.as_view(), name='teacher_signup'),
]
