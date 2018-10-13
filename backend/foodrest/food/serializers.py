from rest_framework import serializers
from .models import Food, FoodType
#from .models import GroceryList, FoodTypeDefaultSection, GroceryStore, GrocerySection
#from food.nerializers import foodSerializer
from grocery.serializers import foodTypeDefaultSectionSerializer

class foodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id', 'name', 'foodtype', 'staple', 'ignore')

class foodTypeSerializer(serializers.ModelSerializer):

    #defaultSection = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    defaultSection = foodTypeDefaultSectionSerializer(many=True, read_only=True)

    class Meta:
        model = FoodType
        fields = ('id', 'name', 'defaultSection')


# class foodTypeDefaultSectionSerializer(serializers.ModelSerializer):
#     store = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
#     foodType = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
#     section = serializers.SlugRelatedField(many=False, read_only=True, slug_field='sectionName')

#     class Meta:
#         model = FoodTypeDefaultSection
#         fields = ('foodType','store','section')
