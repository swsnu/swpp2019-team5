from django.urls import path
from item import views

urlpatterns = [
    path('<int:item_id>/', views.getItem, name='a'),
    path('<int:item_id>/outfit/', views.getOutfitContainedItem, name=''),
    path('<int:item_id>/tag/', views.getTagsOfItem, name=''),
    path('<int:item_id>/<int:tag_id>/', views.getSelectedTag, name=''),
]
