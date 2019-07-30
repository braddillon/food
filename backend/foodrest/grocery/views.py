from django.shortcuts import render

import copy
from rest_framework import generics
from .serializers import groceryListSerializer, foodTypeDefaultSectionSerializer, GroceryStoreSerializer, GroceryStoreSectionSerializer, foodTypeDefaultSectionSerializer, FoodGrocerySectionSerializer
from food.serializers import foodSerializer
from rest_framework import mixins, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from .models import GroceryList, FoodTypeDefaultSection, GroceryStore, GrocerySection, FoodGrocerySection
from food.models import Food
#from .models import GroceryList, FoodTypeDefaultSection, GroceryStore, GrocerySection
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
# from .models import GroceryList

# class GroceryList(generics.CreateAPIView):
#     serializer_class = groceryListSerializer

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """

#         return GroceryList.objects.all()


# class groceryList(generics.CreateAPIView):
#     serializer_class = groceryListSerializer

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """

#         return GroceryList.objects.all()

# class groceryListDeleteItem(generics.DestroyAPIView):
#     serializer_class = groceryListSerializer

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """

#         return GroceryList.objects.all()

# class groceryList3(mixins.DestroyModelMixin, generics.GenericAPIView):
#     serializer_class = groceryListSerializer

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """

#         return GroceryList.objects.all()


# @api_view()
# def hello_world(request):
#     return Response({"message": "Hello, world!"})

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'groceryList': reverse('grocery:groceryList', request=request, format=format),
        'groceryCreate': reverse('grocery:groceryCreate', request=request, format=format),
        #'groceryDetail': reverse('grocery:groceryDetail', request=request, format=format),
        'foodGrocerySection': reverse('grocery:foodGrocerySection', request=request, format=format),
        #'foodGrocerySectionDetail': reverse('grocery:foodGrocerySectionDetail', request=request, format=format),
        'groceryStoreList': reverse('grocery:groceryStoreList', request=request, format=format),
    })


@api_view()
def listGroceries(request):
    

    gl = GroceryList.objects.all().prefetch_related()
    groceryList = {}

    uncatSections = GrocerySection.objects.filter(sectionName='Uncategorized')
    uncatDict = {}
    for uncat in uncatSections:
        uncatDict[uncat.store.id] = uncat.id

    for x in gl:
        section = FoodGrocerySection.objects.filter(food=x.food)
        mySecs = copy.deepcopy(uncatDict)
        for sec in section:
            # print(sec.section.id)
            mySecs[sec.section.store.id] = sec.section.id
        groceryList[x.food.id] = {'id': x.food.id, 'name': x.food.name, 'deferred': x.deferred, 'foodtype': x.food.foodtype.id, 'grocerySections': mySecs}
    #     # print(x.food.id)

    return Response(groceryList)

@api_view(['POST']) 
def wipeGroceries(request):
    GroceryList.objects.all().delete()
    return Response('')


@api_view()
def groceriesByStore(request, id):
    groceryList = {}
    foodItems = GroceryList.objects.values_list("food_id", flat=True).distinct()
    foodsLeft = list(foodItems)

    grocerySections = GrocerySection.objects.filter(store__id=id)
    for gSec in grocerySections: 
        foods = FoodGrocerySection.objects.filter(food__in=foodItems).filter(section=gSec.id).select_related('food').select_related('section')
        if foods.count() != 0:
            myFood = {}
            for f in foods:
                foodsLeft.remove(f.food.id)
                myFood[f.food.id] = {'id': f.food.id, 'name': f.food.name}
            groceryList[gSec.id] = {'food': myFood, 'sectionname': gSec.sectionName, 'id': gSec.id }

    foods = Food.objects.filter(id__in=foodsLeft)
    if foods.count() != 0:
            myFood = {}
            for f in foods:
                myFood[f.id] = {'id': f.id, 'name': f.name}
            groceryList[100] = {'food': myFood, 'sectionname': 'undefined', 'id': 100 }

    return Response(groceryList)


@api_view()
def foodGrocerySections(request, food):
    grocerySections = FoodGrocerySection.objects.filter(food_id=food)
    #print(food)
    sections = {}
    for x in grocerySections:
        sections[x.section.store.id] = x.section.id
    return Response(sections)




class groceryStoreList(generics.ListAPIView):
    serializer_class = GroceryStoreSerializer
    queryset = GroceryStore.objects.all()

# class groceryList(mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = GroceryList.objects.all()
#     serializer_class = groceryListSerializer

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)


class groceryListDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = GroceryList.objects.all()
    serializer_class = groceryListSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# class groceryListDetail(mixins.RetrieveModelMixin,
#                     mixins.UpdateModelMixin,
#                     mixins.DestroyModelMixin,
#                     generics.GenericAPIView):
#     queryset = GroceryList.objects.all()
#     serializer_class = groceryListSerializer

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)

#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)

class FoodGrocerySectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoodGrocerySection.objects.all()
    serializer_class = FoodGrocerySectionSerializer
    lookup_field = 'food'

class FoodGrocerySectionList(generics.ListCreateAPIView):
    queryset = FoodGrocerySection.objects.all()
    serializer_class = FoodGrocerySectionSerializer


@api_view(['POST']) 
def foodGrocerySectionDelete(request, food):
    #print(food)
    print("To delete", flush=True)
    print(food, flush=True)
    grocerySections = FoodGrocerySection.objects.filter(food_id=food).delete()
    print(grocerySections, flush=True)
    #GroceryList.objects.all().delete()
    return Response('')


@api_view(['POST']) 
def groceryCreate(request):
    try:
        food = Food.objects.get(id=request.data['food'])
    except ObjectDoesNotExist:
        return Response("Unknown Food Id", status=status.HTTP_400_BAD_REQUEST)

    try:
        GroceryList.objects.create(food=food, deferred=request.data['deferred'])
    except IntegrityError:
        return Response("Food already on grocery list", status=status.HTTP_400_BAD_REQUEST)
    
    uncatSections = GrocerySection.objects.filter(sectionName='Uncategorized')
    uncatDict = {}
    for uncat in uncatSections:
        uncatDict[uncat.store.id] = uncat.id

    section = FoodGrocerySection.objects.filter(food=food)
    mySecs = copy.deepcopy(uncatDict)
    for sec in section:
        # print(sec.section.id)
        mySecs[sec.section.store.id] = sec.section.id
    
    return Response({'id': food.id, 'name': food.name, 'deferred': request.data['deferred'], 'foodtype': food.foodtype.id, 'grocerySections': mySecs})




