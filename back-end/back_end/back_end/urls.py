"""back_end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from cat.views import *
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    url(r'^users/$', UserDetail.as_view()),
    url(r'^users/(?P<user_id>[0-9]+)/$', user_detail),
    url(r'^admin/', admin.site.urls),
    url(r'^sign_in/$', signin, name='signin'),   # sign in page
    url(r'^sign_up/$', signup, name='signup'),   # sign up page
    url(r'^timeline/(?P<user_id>[0-9]+)/$', timeline_total),
    url(r'^timeline/(?P<user_id>[0-9]+)/group/(?P<group_id>[0-9]+)/$', timeline_detail),
    url(r'^setting/(?P<user_id>[0-9]+)/$', setting_detail),   #settings page
    #유저가 속한 그룹들 정보
    #그룹에 속한 유저들 정보
    #url(r'^main/$', , name='main'),  # main page
    #url(r'^group/$', ), # group list page
    #url(r'^group/(?P<pk>[0-9]+)/$', ),  # group detail page
    #url(r'^group/join/$', ),    # group join page
    #url(r'^group/create/$', ),  # group create page
    #url(r'^stats/$', ), # statistics page
    #url(r'^settings/$', ),   #settings page
]
