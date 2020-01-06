from django.shortcuts import render

import copy
from rest_framework import generics
from .serializers import groceryListSerializer, foodTypeDefaultSectionSerializer, GroceryStoreWithSectionSerializer, GroceryStoreSerializer, GroceryStoreSectionSerializer, foodTypeDefaultSectionSerializer, FoodGrocerySectionSerializer
from food.serializers import foodSerializer
from rest_framework import mixins, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from .models import GroceryList, FoodTypeDefaultSection, GroceryStore, GrocerySection, FoodGrocerySection
from food.models import Food, FoodType
#from .models import GroceryList, FoodTypeDefaultSection, GroceryStore, GrocerySection
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.db.models import Max
import json

import json
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

    def_sections = {}
    for ftype in FoodType.objects.all().values_list('id', flat=True):
        def_sections[ftype] = copy.deepcopy(uncatDict)
    print(def_sections, flush=True)
    
    #{5: 24, 48: 106, 49: 113, 50: 116}

    defaultSections = FoodTypeDefaultSection.objects.all()
    for item in defaultSections:
        print(str(item.foodType.id) + ',' + str(item.store.id), flush=True)
        def_sections[item.foodType.id][item.store.id] = item.section.id

    print(def_sections, flush=True)

    
    # section = models.ForeignKey(GrocerySection, on_delete=models.CASCADE)
    # store = models.ForeignKey(GroceryStore, on_delete=models.CASCADE)
    # foodType = models.ForeignKey(FoodType, related_name='defaultSection', on_delete=models.CASCADE)
    # for mdef in defaultSections:
    #     print(mdef, flush=True)
    #print(gl, flush=True)
    #print(uncatDict, flush=True)
    for x in gl:
        # Start with uncategorized sections
        mySecs = copy.deepcopy(def_sections[x.food.foodtype.id])

        # Apply any food specific overrides
        section = FoodGrocerySection.objects.filter(food=x.food)
        for sec in section:
            mySecs[sec.section.store.id] = sec.section.id


        groceryList[x.food.id] = {'id': x.food.id, 'name': x.food.name, 'deferred': x.deferred, 'check':x.check, 'foodtype': x.food.foodtype.id, 'grocerySections': mySecs}
        #print(groceryList, flush=True)
    #     # print(x.food.id)

    return Response(groceryList)

@api_view(['POST']) 
def wipeGroceries(request):
    GroceryList.objects.all().delete()
    return Response('')


@api_view()
def getFoodTypeDefaultSection(request, store_id):
    defSections = FoodTypeDefaultSection.objects.filter(store__id=store_id)

    response = {}
    for x in defSections:
        response[x.foodType.id] = {'id': x.foodType.id, 'store_id':x.store.id, 'section_id':x.section.id}
    print(response, flush=True)

    return Response(response)


@api_view()
def groceriesByStore(request, id):
    groceryList = {}
    foodItems = GroceryList.objects.values_list("food_id", flat=True).distinct()
    foodsLeft = list(foodItems)

    # Check for individual food item section overrides
    grocerySections = GrocerySection.objects.filter(store__id=id)
    for gSec in grocerySections: 
        foods = FoodGrocerySection.objects.filter(food__in=foodItems).filter(section=gSec.id).select_related('food').select_related('section')
        if foods.count() != 0:
            myFood = {}
            for f in foods:
                foodsLeft.remove(f.food.id)
                myFood[f.food.id] = {'id': f.food.id, 'name': f.food.name}
            groceryList[gSec.id] = {'food': myFood, 'sectionname': gSec.sectionName, 'id': gSec.id }

    # Remainder
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

@api_view(['POST']) 
def createStore(request):
    if 'name' in request.data:
        name = request.data['name']

        gr = GroceryStore.objects.create(name=request.data['name'])
        sec = GrocerySection.objects.create(store=gr, sectionName='Uncategorized', order=0)
        # returnData = {}
        returnData = {'id': gr.id, 'name': gr.name, 'sections':{sec.id:{'id':sec.id, 'sectionName': sec.sectionName, 'order': sec.order}}}
        return Response(returnData)
    else:
        return Response('Missing store name')

@api_view(['POST']) 
def createStoreSection(request):
    if ('name' in request.data) & ('store_id' in request.data):
        name = request.data['name']
        store_id = request.data['store_id']
        
        gr = GroceryStore.objects.get(pk=store_id)
        order_qry = GrocerySection.objects.filter(store=gr).aggregate(max_order=Max('order'))
        print(order_qry, flush=True)
        if order_qry.get('max_order') is None:
            order = 0
        else:
            order = order_qry.get('max_order')+1
        sec = GrocerySection.objects.create(store=gr, sectionName=name, order=order)
        
        # returnData = {}
        returnData = {'store_id': gr.id, 'sec_id':sec.id, 'sec_name': sec.sectionName, 'order': sec.order}
        return Response(returnData)
    else:
        return Response('Missing store name')


class groceryStoreList(generics.ListAPIView):
    serializer_class = GroceryStoreWithSectionSerializer
    queryset = GroceryStore.objects.all()

# class groceryList(mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = GroceryList.objects.all()
#     serializer_class = groceryListSerializer

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)

class groceryStoreDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = GroceryStore.objects.all()
    serializer_class = GroceryStoreSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


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

class GroceryStoreSectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GrocerySection.objects.all()
    serializer_class = GroceryStoreSectionSerializer

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

@api_view(['PUT']) 
def storeSectionOrderUpdate(request, storeId):
    if 'sections' in request.data:
        sections_update = request.data['sections']

        sections = GrocerySection.objects.filter(store=storeId)
        for sec in sections:
            sec.order = sections_update[str(sec.id)]['order']
        GrocerySection.objects.bulk_update(sections, ['order'])
        return Response('success')
    else:
        return Response('Missing appropiate sections object')

#bradbrad
@api_view(['PUT']) 
def storeFoodDefaultSectionUpdate(request, storeId):
    if 'defaults' in request.data:
        food_defaults = request.data['defaults']
        store = GroceryStore.objects.get(pk=storeId)
        FoodTypeDefaultSection.objects.filter(store=store).delete()
        newItems = []
        for x in food_defaults:
            newItem = FoodTypeDefaultSection(section_id=food_defaults[x], 
                                    store=store, 
                                    foodType_id=x)
            newItems.append(newItem)
        FoodTypeDefaultSection.objects.bulk_create(newItems)
        return Response('success')
    else:
        return Response('Missing appropiate defaults object')


@api_view(['PUT']) 
def storeFoodTypeDefaultSectionUpdate(request, storeId):
    if 'foodtypedefaultsections' in request.data:
        defaults = request.data['foodtypedefaultsections']

        FoodTypeDefaultSection.objects.filter(store=storeId).delete()
        store=GroceryStore.objects.get(pk=storeId)

        for key in defaults:
            b = FoodTypeDefaultSection(store=store, 
                                foodType=FoodType.objects.get(pk=key), 
                                section=GrocerySection.objects.get(pk=defaults[key]))
            b.save()
        return Response('success')
    else:
        return Response('Missing appropiate defaults')

# class FoodTypeDefaultSection(models.Model):
#     section = models.ForeignKey(GrocerySection, on_delete=models.CASCADE)
#     store = models.ForeignKey(GroceryStore, on_delete=models.CASCADE)
#     foodType = models.ForeignKey(FoodType, related_name='defaultSection', on_delete=models.CASCADE)



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




