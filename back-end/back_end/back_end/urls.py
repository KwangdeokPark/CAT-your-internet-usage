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

urlpatterns = [
    url(r'^users/$', UserDetail.as_view()),
    url(r'^users/(?P<user_id>[0-9]+)/$', user_detail),
    url(r'^users_group/(?P<user_id>[0-9]+)/$', user_group_detail),
    url(r'^admin/', admin.site.urls),
    url(r'^sign_in/$', signin, name='signin'),   # sign in page
    url(r'^sign_up/$', signup, name='signup'),   # sign up page
    url(r'^timeline/(?P<user_id>[0-9]+)/$', timeline_total),
    url(r'^timeline/(?P<user_id>[0-9]+)/group/(?P<group_id>[0-9]+)/$', timeline_detail),
    url(r'^setting/(?P<user_id>[0-9]+)/$', setting_detail),
    url(r'^group/$', group_all),
    url(r'^group/(?P<group_id>[0-9]+)/$', group_detail),
    url(r'^group/(?P<group_id>[0-9]+)/users/(?P<user_id>[0-9]+)/$', group_delete),
    url(r'^group_stat/(?P<group_id>[0-9]+)/$', group_stat),
]
