from django.urls import path
from user import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('login/', views.signin, name=''),
    path('logout/', views.signout, name=''),
    path('user/', views.createUser, name=''),
]