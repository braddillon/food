from django.db import models
from taggit.managers import TaggableManager

from food.models import Food

# Create your models here.
class RecipeSection(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    tags = TaggableManager()
    source = models.URLField()

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    units = models.CharField(max_length=255)
    amount = models.CharField(max_length=255)
    notes = models.CharField(max_length=255)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    section = models.ForeignKey(RecipeSection, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Direction(models.Model):
    text = models.TextField()
    sort = models.IntegerField()
    section = models.ForeignKey(RecipeSection, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.text)

