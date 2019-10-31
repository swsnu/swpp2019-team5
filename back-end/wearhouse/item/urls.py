from django.urls import path
from item import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('item/<int:item_id>/', views.getItem, name='a'),
    path('item/<int:item_id>/outfit/', views.getOutfitContainedItem, name=''),
    path('item/<int:item_id>/tag/', views.getTagsOfItem, name=''),
    path('item/<int:item_id>/<int:tag_id>/', views.getSelectedTag, name=''),
]