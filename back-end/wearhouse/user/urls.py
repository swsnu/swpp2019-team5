from django.urls import path
from user import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('user/login/', views.signin, name=''),
    path('user/logout/', views.signout, name=''),
    path('user/', views.createUser, name=''),
]