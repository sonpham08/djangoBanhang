
from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView
from rest_framework.authtoken import views as rest_framework_views
from user import endpoints
from product import endpoints
from . import routers
# from subjects.views import classroom, students, teachers
from .views import change_password
from .views import login
from  django.contrib.auth import views as auth_views
from .views import login
from rest_framework.authtoken import views
from user.views import SignUpView
from user import endpoints
# from product import endpoints

urlpatterns = [
    path('admin/', admin.site.urls),
    # url(r'api/', include(routers.SharedAPIRootRouter.router.urls)),
    url(r'^api/', include(endpoints)),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^get_auth_token/$', rest_framework_views.obtain_auth_token, name='get_auth_token'),
    path('', include('user.urls')),
    path('api/login', login),
    path('rest-auth/', include('rest_auth.urls') ),
    path('api-token-auth/', views.obtain_auth_token, name="api-token-auth"),
    # path("/auth/register/$", RegistrationAPI.as_view()),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('^rest-auth/registration/', include('rest_auth.registration.urls')),

    # path('waitroom/', waitroom, name="waitroom"),

    # path('api/v1/', include('subject_auth.urls')),
    # url(r'^', include('subjects.urls')),
    # url(r'^accounts/', django.contrib.auth.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('login/', include('user.urls')),
    path('accounts/password', change_password, name='change_password'),
    path('accounts/signup/', SignUpView.as_view(), name='signup'),
    # path('accounts/signup/student/', students.StudentSignUpView.as_view(), name='student_signup'),
    # path('accounts/signup/teacher/', teachers.TeacherSignUpView.as_view(), name='teacher_signup'),
]
