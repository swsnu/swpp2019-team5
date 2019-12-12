from django.urls import path
from item import views

urlpatterns = [
    path('', views.getItems, name=''),
]