from django.urls import path
from user import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('login/', views.signin, name='login'),
    path('logout/', views.signout, name='logout'),
    path('', views.user, name='user'),
]
