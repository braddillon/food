"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from patches import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_swagger.views import get_swagger_view
from django.views.static import serve

from food.urls import router as food_router


from food import views
from . import settings

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.extend(food_router)

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    # url(r'^$', views.SPA_entry, name='SPA_entry'),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^apidoc/', schema_view),
    url(r'^', include('food.urls', namespace='food')),
    url(r'^', include('grocery.urls', namespace='grocery')),
    url(r'^', include('recipe.urls', namespace='recipe')),
    # url(r'^api-auth/login/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/auth/token/$', obtain_jwt_token),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    #url(r'^(?:.*)/?$', views.SPA_entry),
]
