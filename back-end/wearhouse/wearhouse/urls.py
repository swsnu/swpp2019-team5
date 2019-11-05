"""wearhouse URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from outfit import  views as outfit_views
from item import views as item_views
from tag import views as tag_views
from user import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', user_views.token, name='token'),
    path('user/login/', user_views.signin, name=''),
    path('user/logout/', user_views.signout, name=''),
    path('user/', user_views.createUser, name=''),
    path('api/tag/<int:tag_id>/', tag_views.getTag, name=''),
    path('api/tag/<int:tag_id>/item/', tag_views.getItemHavingTag, name=''),
    path('api/outfit/', outfit_views.outfit, name=''),
    path('api/outfit/<int:outfit_id>/', outfit_views.getOutfit, name=''),
    path('api/outfit/<int:outfit_id/item>/', outfit_views.getItemsOfOutfit, name=''),
    path('api/outfit/<int:outfit_id/<int:item_id>/', outfit_views.getSpecificItemOfOutfit, name=''),
    path('api/item/<int:item_id>/', item_views.getItem, name='a'),
    path('api/item/<int:item_id>/outfit/', item_views.getOutfitContainedItem, name=''),
    path('api/item/<int:item_id>/tag/', item_views.getTagsOfItem, name=''),
    path('api/item/<int:item_id>/<int:tag_id>/', item_views.getSelectedTag, name=''),
]
