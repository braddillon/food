from django.contrib import admin
from .models import RecipeSection, Recipe, Ingredient, Direction, Thumbnail

# Register your models here.
admin.site.register(RecipeSection)
admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Direction)
admin.site.register(Thumbnail)