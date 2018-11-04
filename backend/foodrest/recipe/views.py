from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
import random

from food.models import Food

# Create your views here.

@api_view(['POST']) 
def parseIngredients(request):
    ingredients = request.data['ingText'].splitlines()
    myResponse = {}
    tmpCounter = 1
    for x in ingredients:
    #x = ingredients[0]
        item = {}
        parts = x.split(",")
        tmp = parts[0]
        notes = ""
        if (len(parts)==2):
            notes = parts[1].lstrip()

        parts2 = tmp.split(' ', 1)
        amount = parts2[0]
        parts3 = parts2[1].split(' ', 1)
        unit = parts3[0]
        food = parts3[1]

        # print('amount: ' + amount, flush=True)
        # print('units: ' + unit, flush=True)
        # print('food: ' + food, flush=True)
        # print('notes: ' + notes, flush=True)

        

        potentialMatches = {}


        qry = Food.objects.filter(name__icontains=food)
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
        item['potentialMatches'] = potentialMatches
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