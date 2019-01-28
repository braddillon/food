from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.reverse import reverse
from rest_framework.response import Response
import random
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import re
from django.conf import settings
import base64
import shutil
import os


from food.models import Food
from taggit.models import Tag

from .models import RecipeSection, Recipe, Ingredient, Direction, Thumbnail
from .serializers import RecipeSectionSerializer, RecipeListSerializer, IngredientSerializer, DirectionSerializer, RecipeSerializer, FileSerializer

# Create your views here.

@api_view(['POST']) 
def parseIngredients(request):
    ingredients = request.data['ingText'].splitlines()
    myResponse = {}
    tmpCounter = 1
    for x in ingredients:
        print(x, flush=True)
        item = {}
        parts = x.split(",")
        tmp = parts[0]
        notes = ""
        if (len(parts)==2):
            notes = parts[1].lstrip()

        parts2 = tmp.split(' ', 1)
        amount = parts2[0]
        parts3 = parts2[1].split(' ', 1)
        if len(parts3) == 1:
            unit = "per"
            food = parts3[0]
        else:
            unit = parts3[0]
            food = parts3[1]

        potentialMatches = {}

        #Check for exact match
        qry = Food.objects.filter(name__iexact=food)
        if len(qry) == 0:
            qry = Food.objects.filter(name__icontains=food)

        for y in qry:
            potentialMatches[y.id] = y.name

        item['tmpId'] = tmpCounter
        item['fullText'] = x
        item['name'] = food
        item['amount'] = amount
        item['units'] = unit
        item['notes'] = notes
        item['potentialMatches'] = potentialMatches
        item['section'] = 1
        if(len(potentialMatches)==1):
            item['selection'] = list(potentialMatches.keys())[0]
        elif (len(potentialMatches)>1):
            item['selection'] = 0
        else:
            item['selection'] = -1
        myResponse[tmpCounter] = item
        tmpCounter = tmpCounter+1

    return Response(myResponse)

class recipeSectionList(generics.ListCreateAPIView):
    queryset = RecipeSection.objects.all()
    serializer_class = RecipeSectionSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([]) 
def RecipeTagList(request):
    tags = Tag.objects.all()
    data2 = {}
    for x in tags:
        tmpDict = {}
        tmpDict['id'] = x.id
        tmpDict['name'] = x.name
        tmpDict['slug'] = x.slug
        data2[x.id] = tmpDict
    return Response(data2)


@api_view(['POST']) 
def recipeCreate(request):

    if (request.data['name'] == ''):
        return Response("Missing Recipe Name", status=status.HTTP_400_BAD_REQUEST)
    
    if (request.data['recipeId'] != '0'):
        # EDIT Mode
        recipe = Recipe.objects.get(pk=int(request.data['recipeId']))
        recipe.name = request.data['name']
        recipe.source = request.data['source']
        recipe.tags.clear()
        tags2 = re.split('[;, ]+',request.data['tags'])
        for x in tags2:
            if x != '':
                recipe.tags.add(x)
        if 'file' in request.data:
        # new file exists.  need to get rid of old one and replace with new one.
            if recipe.image:
                if (os.path.isfile(recipe.image.path) and ('.' in recipe.image.path)):
                    idx = recipe.image.path.index('.')
                    thumbFile = recipe.image.path[:idx] + '_thumb' + recipe.image.path[idx:]
                    os.remove(recipe.image.path)
                    os.remove(thumbFile)
                    thumbResults = Thumbnail.objects.filter(recipe=recipe)
                    for thumb in thumbResults:
                        thumb.delete()                    
            recipe.image = request.data['file']
        recipe.save()
        # delete existing directions and ingredients
        Ingredient.objects.filter(recipe=recipe).delete()
        Direction.objects.filter(recipe=recipe).delete()
    else:
        if 'file' in request.data:
            recipe = Recipe(name=request.data['name'], source=request.data['source'], image=request.data['file'])
        else:
            recipe = Recipe(name=request.data['name'], source=request.data['source'])
        tags2 = re.split('[;, ]+',request.data['tags'])
            
        for x in tags2:
            if x != '':
                recipe.tags.add(x)
        recipe.save()

    ingredients = {}
    for key in request.data:
        if ((key[:12] == 'ingredients[') and (not("potentialMatches" in key))):
            ings = re.findall(r'\[([^]]*)\]',key)
            if not ings[0] in ingredients:
                ingredients[ings[0]] = {}
            ingredients[ings[0]][ings[1]] = request.data[key]
            
    for ingId in ingredients:
        x = ingredients[ingId]
        ing = Ingredient(name=x['name'], units=x['units'], amount=x['amount'], notes=x['notes'], food=Food.objects.get(id=x['selection']), recipe=recipe, section=RecipeSection.objects.get(id=x['section']))
        ing.save()

    directions = {}
    
    for key in request.data:
        if ((key[:11] == 'directions[')):
            dirs = re.findall(r'\[([^]]*)\]',key)
            if not dirs[0] in directions:
                directions[dirs[0]] = {}
            directions[dirs[0]][dirs[1]] = request.data[key]

    for dirId in directions:
        x = directions[dirId]
        dir = Direction(text=x['direction'], sort=x['id'], section=RecipeSection.objects.get(id=x['section']), recipe=recipe)
        dir.save()

    return Response({'status': 'success'})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])  
def RecipeList(request):
    qry = Recipe.objects.all()
    data2 = {}
    for x in qry:
        tmpDict = {}
        tmpDict['id'] = x.id
        tmpDict['name'] = x.name
        tmpDict['slug'] = x.slug
        
        thumbs = x.thumbnail.all()
        if (len(thumbs) == 1) and (thumbs[0].media != ''):
            tmpDict['thumbnail'] = request.build_absolute_uri(thumbs[0].media.url)
        else:
            tmpDict['thumbnail'] = ''
        tmpDict['tags'] = ','.join(map(str, x.tags.all()))
        data2[x.id] = tmpDict
    print(data2, flush=True)
    return Response(data2)
 

class IngredientList(generics.ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = {obj['id']: obj for obj in serializer.data}
        return Response(data)

class DirectionList(generics.ListAPIView):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = {obj['id']: obj for obj in serializer.data}
        return Response(data)

class RecipeDetail(generics.RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = []
    authentication_classes = []
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

#https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/
#https://stackoverflow.com/questions/41878838/how-do-i-set-multipart-in-axios-with-react
class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
