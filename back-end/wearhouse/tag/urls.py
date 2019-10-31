from django.urls import path
from tag import views

urlpatterns = [
    path('token/', views.token, name='token'),
]