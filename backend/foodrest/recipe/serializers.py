from rest_framework import serializers

from .models import RecipeSection, Recipe, Direction, Ingredient, File, Thumbnail
#from food.serializers import foodSerializer

class RecipeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeSection
        fields = ('__all__')

class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = ['media']

class RecipeListSerializer(serializers.ModelSerializer):
    thumbnail = ThumbnailSerializer(many=True, read_only=True)
    
    class Meta:
        model = Recipe
        fields = (['id', 'name', 'slug', 'thumbnail', 'tags'])

class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ('id', 'text', 'sort', 'section', 'recipe')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'units', 'amount', 'notes', 'food', 'recipe', 'section')

class TagSerializerField(serializers.ListField):
    child = serializers.CharField()

    def to_representation(self, data):
        return data.values_list('name', flat=True)

class RecipeSerializer(serializers.ModelSerializer):

    directions = DirectionSerializer(many=True, read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)
    tags = TagSerializerField()

    class Meta:
        model = Recipe
        fields = (['id', 'name', 'source', 'tags', 'image', 'directions', 'ingredients'])
        
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('file', 'remark', 'timestamp')
