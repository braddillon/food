from rest_framework import serializers

from .models import RecipeSection
#from food.serializers import foodSerializer

class RecipeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeSection
        fields = ('__all__')