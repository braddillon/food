
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


from . import views

router = DefaultRouter()
# router.register(r'food', views.foodViewSet)
# router.register(r'food2', views.food2ViewSet)
# router.register(r'hello', views.hello_world)

app_name = 'food'
urlpatterns = [
    #url(r'^', include(router.urls)),
    # url(r'^api/calories$', views.caloriesFromFatSecret.as_view()),
    url(r'^api/hello$', views.hello_world),
    url(r'^api/foodModifyAttribute$', views.foodModifyAttribute),
    url(r'^api/foodDeleteItems$', views.foodDeleteItems),
    url(r'^api/foodDetailWithGrocerySection/(?P<id>[0-9]+)/$', views.foodDetailWithGrocerySection),
    url(r'^api/food$', views.FoodList.as_view()),
    url(r'^api/foodType$', views.FoodTypeList.as_view()),
    url(r'^api/staples$', views.StapleList.as_view()),
    url(r'^api/foodCreate$', views.foodCreate.as_view()),
    url(r'^api/foodDetail/(?P<pk>[0-9]+)/$', views.foodDetail.as_view()),
    # url(r'^api/nutritionWeeklyStats$', views.nutritionWeeklyStats),
    # url(r'^api/pullFatSecret', views.pullFromFatSecret),
    # url(r'^api/postMoodSurvey', views.postMoodSurvey),
]
