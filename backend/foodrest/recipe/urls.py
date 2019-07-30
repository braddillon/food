
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


from . import views

app_name = 'recipe'
urlpatterns = [
    url(r'^api/parseIngredients$', views.parseIngredients, name='parseIngredients'),
    url(r'^api/recipeSection$', views.recipeSectionList.as_view(), name='recipeSection'),
    url(r'^api/recipeTags$', views.RecipeTagList, name='recipeTags'),
    url(r'^api/recipeCreate$', views.recipeCreate, name='recipeCreate'),
    url(r'^api/recipeList$', views.RecipeList, name='recipeList'),
    url(r'^api/ingredientList$', views.IngredientList.as_view(), name='ingredientList'),
    url(r'^api/directionList$', views.DirectionList.as_view(), name='directionList'),
    url(r'^api/recipe/(?P<slug>[\w-]+)/$', views.RecipeDetail.as_view(), name='recipeDetail'),
    url(r'^api/upload/$', views.FileView.as_view(), name='file-upload'),
]
