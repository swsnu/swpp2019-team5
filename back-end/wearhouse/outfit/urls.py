from django.urls import path
from outfit import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('', views.outfit, name=''),
    path('<int:outfit_id>/', views.specificOutfit, name=''),
    path('<int:outfit_id/item>/', views.getItemsOfOutfit, name=''),
    path('<int:outfit_id/<int:item_id>/',
         views.getSpecificItemOfOutfit, name=''),
]
