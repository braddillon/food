from django.db import models
from django.utils import timezone

# Create your models here.


class FoodType(models.Model):
    name = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Food(models.Model):
    name = models.CharField(max_length=255)
    foodtype = models.ForeignKey(FoodType, on_delete=models.CASCADE)
    staple = models.BooleanField(default=False)
    ignore = models.BooleanField(default=False)
    updated = models.DateTimeField(editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        self.updated = timezone.now()
        return super(Food, self).save(*args, **kwargs)
