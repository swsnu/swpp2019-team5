from django.urls import path
from tag import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('tag/<int:tag_id>/', views.getTag, name=''),
    path('tag/<int:tag_id>/item/', views.getItemHavingTag, name=''),
]