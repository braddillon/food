
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


from . import views

app_name = 'recipe'
urlpatterns = [
    url(r'^api/parseIngredients$', views.parseIngredients, name='parseIngredients'),
]


#     url(r'^api/groceryList$', views.listGroceries, name='groceryList'),
#     url(r'^api/wipeGrocery$', views.wipeGroceries, name='wipeGrocery'),
# 	url(r'^api/groceryByStore/(?P<id>[0-9]+)/$', views.groceriesByStore, name='groceryByStore'),
#     # url(r'^api/groceryCreate$', views.groceryList.as_view(), name='groceryCreate'),
#     url(r'^api/groceryCreate$', views.groceryCreate, name='groceryCreate2'),
#     url(r'^api/groceryDetail/(?P<pk>[0-9]+)/$', views.groceryListDetail.as_view(), name='groceryDetail'),
#     url(r'^api/foodGrocerySections/(?P<food>[0-9]+)/$', views.foodGrocerySections, name='foodGrocerySections'),
#     url(r'^api/foodGrocerySection$', views.FoodGrocerySectionList.as_view(), name='foodGrocerySection'),
#     url(r'^api/foodGrocerySectionDetail/(?P<food>[0-9]+)/$', views.FoodGrocerySectionDetail.as_view(), name='foodGrocerySectionDetail'),
#     url(r'^api/groceryStoreList$', views.groceryStoreList.as_view(), name='groceryStoreList'),
#     url(r'^api/foodGrocerySectionDelete/(?P<food>[0-9]+)/$', views.foodGrocerySectionDelete, name='updateFoodGrocerySection'),

# ]

