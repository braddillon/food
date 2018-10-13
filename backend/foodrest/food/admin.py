from django.contrib import admin
from .models import Food, FoodType

from app.mixins import ExportCsvMixin

# Register your models here.
class FoodModelAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ["id", "name", 'foodtype', 'staple', 'ignore']
    list_editable = ["name", 'foodtype', 'staple', 'ignore']
    actions = ['export_as_csv']
    class Meta:
        model = Food

class FoodTypeModelAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'order']
    list_editable = ["name", 'order']
    class Meta:
        model = FoodType

admin.site.register(Food, FoodModelAdmin)
admin.site.register(FoodType, FoodTypeModelAdmin)

