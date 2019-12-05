from django.urls import path
from outfit import views

urlpatterns = [
    path('', views.outfit, name=''),
    path('<int:outfit_id>/', views.specificOutfit, name=''),
]
