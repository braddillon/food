from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
import random
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import re


from food.models import Food

from .models import RecipeSection, Recipe, Ingredient, Direction
from .serializers import RecipeSectionSerializer, RecipeListSerializer, IngredientSerializer, DirectionSerializer, RecipeSerializer, FileSerializer

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


    print("recipe name" + request.data['name'], flush=True)
    print("tags" + request.data['tags'], flush=True)
    print("source" + request.data['source'], flush=True)
    #print("directions" + request.data['directions'], flush=True)
    print(request.data, flush=True)
    print("BRADLEYYYYYY", flush=True)

    # rebuild ingredients object from formData
    ingredients = {}
    # print("BEFORE", flush=True)
    for key in request.data:
        if ((key[:12] == 'ingredients[') and (not("potentialMatches" in key))):
            ings = re.findall(r'\[([^]]*)\]',key)
            if not ings[0] in ingredients:
                ingredients[ings[0]] = {}
            # tmpIng = {}
            ingredients[ings[0]][ings[1]] = request.data[key]
            # print(key, flush=True)
            # print(ings, flush=True)
            
    # print("AFTER", flush=True)
    # print(ingredients, flush=True)


    #ingredients = request.data['ingredients']
    #print("bing" + ingredients, flush=True)
    print("before");
    print(request.data['file'], flush=True);
    print(type(request.data['file']), flush=True);

    if request.data['file'] == 'null':
        recipe = Recipe(name=request.data['name'], source=request.data['source'])
    else:
        recipe = Recipe(name=request.data['name'], source=request.data['source'], image=request.data['file'])
    tags2 = re.split('[;, ]+',request.data['tags'])
    recipe.save()
 
    for x in tags2:
        print("adding" + x, flush=True)
        recipe.tags.add(x)

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


    #directions = request.data['directions']


    # rebuild directions object from formData
    directions = {}
    # print("BEFORE", flush=True)
    for key in request.data:
        print(key)
        if ((key[:11] == 'directions[')):
            print(key)
            dirs = re.findall(r'\[([^]]*)\]',key)
            if not dirs[0] in directions:
                directions[dirs[0]] = {}
            # tmpIng = {}
            directions[dirs[0]][dirs[1]] = request.data[key]
            # print(key, flush=True)
            # print(ings, flush=True)

    print("directions", flush=True)
    print(directions)
    print("directions2", flush=True)
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


# class RecipeList(generics.ListAPIView):
#     queryset = Recipe.objects.all()
#     serializer_class = RecipeListSerializer
#     # permission_classes = (IsAdminUser,)

#     def list(self, request):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         serializer = RecipeListSerializer(queryset, many=True)
#         return Response(serializer.data)


class RecipeList(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeListSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        #data = {obj['id']: obj for obj in serializer.data}
        data2 = {}
        for obj in serializer.data:
            tmpDict = {}
            tmpDict['id'] = obj['id']
            tmpDict['name'] = obj['name']
            tmpDict['tags'] = obj['tags']
            if (len(obj['thumbnail']) != 0):
                print(obj['thumbnail'][0]['media'], flush=True)
                #print(obj['thumbnail']['media'], flush=True)
                if obj['thumbnail'][0]['media'] == None:
                    tmpDict['thumbnail'] = ''    
                else:
                    tmpDict['thumbnail'] = obj['thumbnail'][0]['media']
            else:
                tmpDict['thumbnail'] = ''

            print(tmpDict['tags'],flush=True)
            # thumbnail = [d for d in obj['thumbnail'] if d['type'] == 'medium']
            # if (len(thumbnail) > 0):
            #     tmpDict['thumbnail'] = thumbnail[0]['media']
            # else:
            #     tmpDict['thumbnail'] = ''
            
            data2[obj['id']] = tmpDict
        return Response(data2)

#brad
@api_view(['GET']) 
def RecipeList(request):
    qry = Recipe.objects.all()
    data2 = {}
    for x in qry:
        tmpDict = {}
        tmpDict['id'] = x.id
        tmpDict['name'] = x.name
        
        thumbs = x.thumbnail.all()
        if (len(thumbs) == 1) and (thumbs[0].media != ''):
            tmpDict['thumbnail'] = request.build_absolute_uri(thumbs[0].media.url)
        else:
            tmpDict['thumbnail'] = ''
        # tags = ','.join(map(str, x.tags.all()))
        tmpDict['tags'] = ','.join(map(str, x.tags.all()))
        data2[x.id] = tmpDict
    print(data2, flush=True)
    return Response(data2)
    #return Response("")

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     serializer = self.get_serializer(queryset, many=True)
    #     #data = {obj['id']: obj for obj in serializer.data}
    #     data2 = {}
    #     for obj in serializer.data:
    #         tmpDict = {}
    #         tmpDict['id'] = obj['id']
    #         tmpDict['name'] = obj['name']
    #         tmpDict['tags'] = obj['tags']
    #         if (len(obj['thumbnail']) != 0):
    #             print(obj['thumbnail'][0]['media'], flush=True)
    #             #print(obj['thumbnail']['media'], flush=True)
    #             if obj['thumbnail'][0]['media'] == None:
    #                 tmpDict['thumbnail'] = ''    
    #             else:
    #                 tmpDict['thumbnail'] = obj['thumbnail'][0]['media']
    #         else:
    #             tmpDict['thumbnail'] = ''

    #         print(tmpDict['tags'],flush=True)
    #         # thumbnail = [d for d in obj['thumbnail'] if d['type'] == 'medium']
    #         # if (len(thumbnail) > 0):
    #         #     tmpDict['thumbnail'] = thumbnail[0]['media']
    #         # else:
    #         #     tmpDict['thumbnail'] = ''
            
    #         data2[obj['id']] = tmpDict
    #     return Response(data2)

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
    lookup_field = 'id'
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

# class FileUploadView(views.APIView):
#     parser_classes = (FileUploadParser,)

#     def put(self, request, filename, format=None):
#         file_obj = request.data['file']
#         # ...
#         # do some stuff with uploaded file
#         # ...
#         return Response(status=204)

# # urls.py
# urlpatterns = [
#     # ...
#     url(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view())
# ]