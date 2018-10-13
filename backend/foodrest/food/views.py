from django.shortcuts import render

from .models import Food, FoodType
from grocery.models import FoodGrocerySection, GrocerySection
from .serializers import foodSerializer, foodTypeSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import mixins


# Create your views here.

#def SPA_entry(request):
#    context = {}
#    return render(request, 'food/entry.html', context)


class FoodTypeList(generics.ListAPIView):
    serializer_class = foodTypeSerializer

    def get_queryset(self):
        return FoodType.objects.all()


class FoodList(generics.ListAPIView):
    serializer_class = foodSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Food.objects.all()
        # print(queryset)
        term = self.request.query_params.get('term', None)
        mtype = self.request.query_params.get('type', None)
        staple = self.request.query_params.get('staple', None)
        ignore = self.request.query_params.get('ignore', None)
        date = self.request.query_params.get('dateModified', None)
        if mtype is not None:
            mtypes = [int(x) for x in mtype.split(',')]

        if term is not None:
            queryset = queryset.filter(name__icontains=term)
        if mtype is not None:
            queryset = queryset.filter(foodtype__id__in=mtypes)
        if staple is not None:
            queryset = queryset.filter(staple=True)
        if ignore is not None:
            queryset = queryset.filter(ignore=True)
        if date is not None:
            queryset = queryset.filter(updated__gte=date)
        return queryset




class foodCreate(mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Food.objects.all()
    serializer_class = foodSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class foodDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Food.objects.all()
    serializer_class = foodSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

# Create your views here.
class StapleList(generics.ListAPIView):
    serializer_class = foodSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """

        return Food.objects.filter(staple=True)


@api_view()
def foodModifyAttribute(request):
    
    mtype = request.query_params.get('type', None)
    idString = request.query_params.get('ids', None)
    if idString is not None:
        ids = [int(x) for x in idString.split(',')]
    print(mtype)
    print(ids)
    #return Response("Success")

    if mtype=="staple":
        querysetDisable = list(Food.objects.filter(id__in=ids).filter(staple=True).values_list('id', flat=True))
        querysetEnable = list(Food.objects.filter(id__in=ids).filter(staple=False).values_list('id', flat=True))

        for food in querysetDisable:
            obj = Food.objects.get(pk=food)
            obj.staple = False
            obj.save()

        for food in querysetEnable:
            obj = Food.objects.get(pk=food)
            obj.staple = True
            obj.save()
        return Response("Success")
    elif mtype=="ignore":
        querysetDisable = list(Food.objects.filter(id__in=ids).filter(ignore=True).values_list('id', flat=True))
        querysetEnable = list(Food.objects.filter(id__in=ids).filter(ignore=False).values_list('id', flat=True))

        for food in querysetDisable:
            obj = Food.objects.get(pk=food)
            obj.ignore = False
            obj.save()

        for food in querysetEnable:
            obj = Food.objects.get(pk=food)
            obj.ignore = True
            obj.save()
        return Response("Success")
    else:
        return Response("Unknown Type", status=status.HTTP_400_BAD_REQUEST)


@api_view()
def foodDeleteItems(request):
    idString = request.query_params.get('ids', None)
    if idString is None:
        return Response("Unknown ids", status=status.HTTP_400_BAD_REQUEST)
    else:

        ids = [int(x) for x in idString.split(',')]
        #print(ids)
        #return Response("Success")

        Food.objects.filter(id__in=ids).delete()
        return Response("Success")
    
    # groceryList = {}
    # myFood = Food.objects.filter(id=id)
    # mySections = FoodGrocerySection.objects.filter(food__id=id).select_related('section')
    # print(mySections)
    # print(myFood)
    # #print(test)
    # if myFood:
    #     sections = {}
    #     for x in mySections:
    #         print(type(x.section.store.id))
    #         sections[x.section.store.id] = x.section.id
    #     groceryList = {'food': myFood[0].name, 'foodtype': myFood[0].foodtype.id, 'staple': myFood[0].staple, 'sections': sections }


@api_view()
def foodDetailWithGrocerySection(request, id):
    groceryList = {}
    myFood = Food.objects.filter(id=id)
    mySections = FoodGrocerySection.objects.filter(food__id=id).select_related('section')
    print(mySections)
    print(myFood)
    #print(test)
    if myFood:
        sections = {}
        for x in mySections:
            print(type(x.section.store.id))
            sections[x.section.store.id] = x.section.id
        groceryList = {'food': myFood[0].name, 'foodtype': myFood[0].foodtype.id, 'staple': myFood[0].staple, 'sections': sections }

    #             store = models.ForeignKey(GroceryStore, related_name='sections', on_delete=models.CASCADE)
    # sectionName = models.CharField(max_length=255, null=True, blank=True)
    # order = models.IntegerField(default=0)

    else:
        groceryList = {}
    # foodItems = GroceryList.objects.values_list("food_id", flat=True).distinct()
    # foodsLeft = list(foodItems)

    # grocerySections = GrocerySection.objects.filter(store__id=id)
    # for gSec in grocerySections:
    #     foods = FoodGrocerySection.objects.filter(food__in=foodItems).filter(section=gSec.id).select_related('food').select_related('section')
    #     if foods.count() != 0:
    #         myFood = {}
    #         for f in foods:
    #             foodsLeft.remove(f.food.id)
    #             myFood[f.food.id] = {'id': f.food.id, 'name': f.food.name}
    #         groceryList[gSec.id] = {'food': myFood, 'sectionname': gSec.sectionName, 'id': gSec.id }

    # foods = Food.objects.filter(id__in=foodsLeft)
    # if foods.count() != 0:
    #         myFood = {}
    #         for f in foods:
    #             myFood[f.id] = {'id': f.id, 'name': f.name}
    #         groceryList[100] = {'food': myFood, 'sectionname': 'undefined', 'id': 100 }

    return Response(groceryList)


@api_view()
def hello_world(request):
    #return Response(Food.objects.all())
    return Response("Hello")
    # return Response(Food.objects.filter(name__icontains='beef'))

class food2ViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Food.objects.all()
    serializer_class = foodSerializer

# http://example.com/api/purchases?username=denvercoder9
class foodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = foodSerializer
    # authentication_classes = (JSONWebTokenAuthentication,SessionAuthentication, BasicAuthentication)

    # permission_classes =  (permissions.IsAuthenticated,
    #                        IsAdminUserOrReadOnly,)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
    def get_queryset(self):
        print("get_queryset")
        return Food.objects.filter(name__icontains='beef')
    #def get_queryset(self):
        # queryset = Mood.objects.filter(owner=self.request.user).order_by('reading_date')
        #return Food.objects.filter(name__icontains='beef')
        #queryset = Glucose.objects.filter(reading_date__gt=datetime.today()-timedelta(days=30)).order_by('reading_date')
        # return queryset
