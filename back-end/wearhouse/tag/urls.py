from django.urls import path
from tag import views

urlpatterns = [
    path('<int:tag_id>/', views.getTag, name=''),
    path('<int:tag_id>/item/', views.getItemHavingTag, name=''),
]
