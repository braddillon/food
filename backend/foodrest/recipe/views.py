from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
import random
from rest_framework import generics
from rest_framework import status
import re


from food.models import Food

from .models import RecipeSection, Recipe, Ingredient, Direction
from .serializers import RecipeSectionSerializer

# Create your views here.

@api_view(['POST']) 
def parseIngredients(request):
    ingredients = request.data['ingText'].splitlines()
    myResponse = {}
    tmpCounter = 1
    for x in ingredients:
    #x = ingredients[0]
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

        # print('amount: ' + amount, flush=True)
        # print('units: ' + unit, flush=True)
        # print('food: ' + food, flush=True)
        # print('notes: ' + notes, flush=True)

        

        potentialMatches = {}

        #Check for exact match
        qry = Food.objects.filter(name__iexact=food)
        if len(qry) == 0:
            qry = Food.objects.filter(name__icontains=food)

        #print("icontains", food, flush=True)
        
        #qry = Food.objects.filter(name_text__search=food)
        # print("ingredients:", flush=True)
        for y in qry:
            #print(y.id, y, flush=True)
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
            #print((potentialMatches.keys())[0], flush=True)
            item['selection'] = list(potentialMatches.keys())[0]
        elif (len(potentialMatches)>1):
            item['selection'] = 0
        else:
            item['selection'] = -1
        myResponse[tmpCounter] = item
        tmpCounter = tmpCounter+1

    print(myResponse, flush=True)

        #print('--' + x,  flush=True)
    #print(ingredients, flush=True)
    return Response(myResponse)

class recipeSectionList(generics.ListCreateAPIView):
    queryset = RecipeSection.objects.all()
    serializer_class = RecipeSectionSerializer


@api_view(['POST']) 
def recipeCreate(request):
    # try:
    #     food = Food.objects.get(id=request.data['name'])
    # except ObjectDoesNotExist:
    #     return Response("Missing Recipe Name", status=status.HTTP_400_BAD_REQUEST)
    if (request.data['name'] == ''):
        return Response("Missing Recipe Name", status=status.HTTP_400_BAD_REQUEST)

    recipe = Recipe(name=request.data['name'], source=request.data['source'])
    tags2 = re.split('[;, ]+',request.data['tags'])
    recipe.save()
    print("tags2")
    print(tags2)
    for x in tags2:
        print("adding" + x, flush=True)
        recipe.tags.add(x)

    print("recipe name" + request.data['name'], flush=True)
    print("tags" + request.data['tags'], flush=True)
    print("source" + request.data['source'], flush=True)
    #print("directions" + request.data['directions'], flush=True)

    ingredients = request.data['ingredients']
    for ingId in ingredients:
        x = ingredients[ingId]
        ing = Ingredient(name=x['name'], units=x['units'], amount=x['amount'], notes=x['notes'], food=Food.objects.get(id=x['selection']), recipe=recipe, section=RecipeSection.objects.get(id=x['section']))
        ing.save()
# name = models.CharField(max_length=255)
#     units = models.CharField(max_length=255)
#     amount = models.CharField(max_length=255)
#     notes = models.CharField(max_length=255)
#     food = models.ForeignKey(Food, on_delete=models.CASCADE)
#     recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
#     section = models.ForeignKey(RecipeSection, on_delete=models.CASCADE)


    directions = request.data['directions']

    for dirId in directions:
        x = directions[dirId]
        print(x, flush=True)
        dir = Direction(text=x['direction'], sort=x['id'], section=RecipeSection.objects.get(id=x['section']), recipe=recipe)
        dir.save()

    #     text = models.CharField(max_length=255)
    # sort = models.IntegerField()
    # section = models.ForeignKey(RecipeSection, on_delete=models.CASCADE)
    # recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    return Response({'status': 'success'})
    # uncatSections = GrocerySection.objects.filter(sectionName='Uncategorized')
    # uncatDict = {}
    # for uncat in uncatSections:
    #     uncatDict[uncat.store.id] = uncat.id

    # section = FoodGrocerySection.objects.filter(food=food)
    # mySecs = copy.deepcopy(uncatDict)
    # for sec in section:
    #     # print(sec.section.id)
    #     mySecs[sec.section.store.id] = sec.section.id
    
    # return Response({'id': food.id, 'name': food.name, 'deferred': request.data['deferred'], 'foodtype': food.foodtype.id, 'grocerySections': mySecs})



#     {
# "name": "beef with brocolli",
# "tags": "yummy",
# "source": "www.google.com"
# }