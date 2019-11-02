from django.urls import path
from outfit import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('outfit/', views.outfit, name=''),
    path('outfit/<int:outfit_id>/', views.getOutfit, name=''),
    path('outfit/<int:outfit_id/item>/', views.getItemsOfOutfit, name=''),
    path('outfit/<int:outfit_id/<int:item_id>/', views.getSpecificItemOfOutfit, name=''),
]