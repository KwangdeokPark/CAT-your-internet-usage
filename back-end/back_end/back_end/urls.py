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
    url(r'^admin/', admin.site.urls),
    #url(r'^sign_in/$', signin, name='signin'),   # sign in page
    url(r'^sign_out/$', refresh_jwt_token),
    url(r'^sign_in/$', obtain_jwt_token),
    url(r'^sign_up/$', signup, name='signup'),   # sign up page
    url(r'^main/$', mainview.as_view(), name='main'),  # main page
    url(r'^user/$', 
    #url(r'^group/$', ), # group list page
    #url(r'^group/(?P<pk>[0-9]+)/$', ),  # group detail page
    #url(r'^group/join/$', ),    # group join page
    #url(r'^group/create/$', ),  # group create page
    #url(r'^stats/$', ), # statistics page
    #url(r'^settings/$', ),   #settings page
]
