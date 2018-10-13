from django.db import models
from django.db import models
from food.models import Food, FoodType

# Create your models here.

class GroceryList(models.Model):
    food = models.OneToOneField(Food, primary_key=True, on_delete=models.CASCADE)
    deferred = models.BooleanField(default=False)

    def __str__(self):
        return self.food.name

    # def get_absolute_url(self):
    #     view_name = "food:detail"
    #     return reverse(view_name, kwargs={"pk": self.id})

    # class Meta:
    #   ordering = ('name',)

class GroceryStore(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class GrocerySection(models.Model):
    store = models.ForeignKey(GroceryStore, related_name='sections', on_delete=models.CASCADE)
    sectionName = models.CharField(max_length=255, null=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['store', 'order',]

    def __str__(self):
        return self.store.name + " -- " + self.sectionName


class FoodGrocerySection(models.Model):
    section = models.ForeignKey(GrocerySection, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
# Create your models here.

class FoodTypeDefaultSection(models.Model):
    section = models.ForeignKey(GrocerySection, on_delete=models.CASCADE)
    store = models.ForeignKey(GroceryStore, on_delete=models.CASCADE)
    foodType = models.ForeignKey(FoodType, related_name='defaultSection', on_delete=models.CASCADE)
