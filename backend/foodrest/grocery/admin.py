from django.contrib import admin
from .models import GroceryList, GroceryStore, GrocerySection, FoodGrocerySection, FoodTypeDefaultSection

from app.mixins import ExportCsvMixin

# Register your models here.
class GrocerySectionModelAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ["id", "store", "sectionName", "order"]
    list_editable = ["store", "sectionName", "order"]
    actions = ['export_as_csv']
    class Meta:
        model = GrocerySection

class GroceryListModelAdmin(admin.ModelAdmin):
    list_display = ["food", "deferred"]
    class Meta:
        model = GroceryList

class FoodGrocerySectionModelAdmin(admin.ModelAdmin):
    list_display = ["food", "section"]
    class Meta:
        model = FoodGrocerySection

class FoodTypeDefaultSectionModelAdmin(admin.ModelAdmin):
    list_display = ["foodType", "section", "store"]
    class Meta:
        model = FoodTypeDefaultSection

admin.site.register(GroceryList, GroceryListModelAdmin)
admin.site.register(GroceryStore)
admin.site.register(FoodTypeDefaultSection, FoodTypeDefaultSectionModelAdmin)
admin.site.register(FoodGrocerySection, FoodGrocerySectionModelAdmin)
admin.site.register(GrocerySection, GrocerySectionModelAdmin)

