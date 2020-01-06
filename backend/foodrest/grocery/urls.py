
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include


from . import views

app_name = 'grocery'
urlpatterns = [
    
    # CLASS BASED VIEWS
    # -----------------
    # List of all foods with appropriate section   (each food will have a section for each grocery store)
    url(r'^api/foodGrocerySection$', views.FoodGrocerySectionList.as_view(), name='foodGrocerySection'),
    # Store info with section detail (sectionNames and order)
    url(r'^api/groceryStoreList$', views.groceryStoreList.as_view(), name='groceryStoreList'),
    # Store id and name,  is this even used?
    url(r'^api/groceryStoreDetail/(?P<pk>[0-9]+)/$', views.groceryStoreDetail.as_view(), name='groceryStoreDetail'),
    # Section id, name, order
    url(r'^api/groceryStoreSectionDetail/(?P<pk>[0-9]+)/$', views.GroceryStoreSectionDetail.as_view(), name='updateGroceryStoreSection'),
    # Broken?
    url(r'^api/foodGrocerySectionDetail/(?P<food>[0-9]+)/$', views.FoodGrocerySectionDetail.as_view(), name='foodGrocerySectionDetail'),
    # food id, deferred, check
    url(r'^api/groceryDetail/(?P<pk>[0-9]+)/$', views.groceryListDetail.as_view(), name='groceryDetail'),


    # CUSTOM FUNCTIONS
    # ----------------

    # Get grocery list items with grocery sections for all stores
    url(r'^api/groceryList$', views.listGroceries, name='groceryList'),
    # Groceries for individual store  (not used?)
	url(r'^api/groceryByStore/(?P<id>[0-9]+)/$', views.groceriesByStore, name='groceryByStore'),
    
    # Grocery sections for a store
    url(r'^api/foodTypeDefaultSections/(?P<store_id>[0-9]+)/$', views.getFoodTypeDefaultSection, name='foodTypeDefaultSections'),
    # Grocery sections for all stores of a food
    url(r'^api/foodGrocerySections/(?P<food>[0-9]+)/$', views.foodGrocerySections, name='foodGrocerySections'),

    # Update order of store sections
    url(r'^api/storeSectionOrderUpdate/(?P<storeId>[0-9]+)/$', views.storeSectionOrderUpdate, name='updateStoreSectionOrder'),
    # Update default food type sections of store
    url(r'^api/storeFoodDefaultSectionUpdate/(?P<storeId>[0-9]+)/$', views.storeFoodDefaultSectionUpdate, name='updateStoreFoodDefaultSection'),
    # Update food type default sections for a store
    url(r'^api/storeFoodTypeDefaultSectionUpdate/(?P<storeId>[0-9]+)/$', views.storeFoodTypeDefaultSectionUpdate, name='updateStoreFoodTypeDefault'),

    url(r'^api/storeCreate$', views.createStore, name='storeCreate'),
    url(r'^api/storeSectionCreate$', views.createStoreSection, name='storeSectionCreate'),
    url(r'^api/groceryCreate$', views.groceryCreate, name='groceryCreate2'),

    url(r'^api/foodGrocerySectionDelete/(?P<food>[0-9]+)/$', views.foodGrocerySectionDelete, name='updateFoodGrocerySection'),
    url(r'^api/wipeGrocery$', views.wipeGroceries, name='wipeGrocery'),

    
]

