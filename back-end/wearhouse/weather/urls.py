from django.urls import path
from . import views

urlpatterns = [
    path('', views.getWeather, name='weather'),
    path('<int:timestamp>', views.getSpecificWeather, name='specWeather'),
]
