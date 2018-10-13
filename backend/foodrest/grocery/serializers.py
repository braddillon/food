from rest_framework import serializers

from .models import GroceryList, FoodTypeDefaultSection, GroceryStore, GrocerySection, FoodGrocerySection
#from food.serializers import foodSerializer

class groceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = ('food', 'deferred')

class GroceryStoreSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrocerySection
        fields = ('id', 'sectionName', 'order')

class GroceryStoreSerializer(serializers.ModelSerializer):
    sections = GroceryStoreSectionSerializer(many=True, read_only=True)

    class Meta:
        model = GroceryStore
        fields = ('id', 'name', 'sections')

class FoodGrocerySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodGrocerySection
        lookup_field = 'food'
        fields = ('food', 'section')


# class foodTypeDefaultSectionSerializer(serializers.ModelSerializer):
#     store = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
#     foodType = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
#     section = serializers.SlugRelatedField(many=False, read_only=True, slug_field='sectionName')

#     class Meta:
#         model = FoodTypeDefaultSection
#         fields = ('foodType','store','section')

class foodTypeDefaultSectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodTypeDefaultSection
        fields = ('store','section')



