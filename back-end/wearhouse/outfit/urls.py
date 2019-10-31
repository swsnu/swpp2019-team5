from django.urls import path
from outfit import views

urlpatterns = [
    path('token/', views.token, name='token'),
]