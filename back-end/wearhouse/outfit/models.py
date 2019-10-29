from django.db import models
from django.contrib.auth.models import User
from item.models import Item
# Create your models here.

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name= 'outfits_owned_by_user')
    items = models.ManyToManyField(Item, related_name= 'item_list')
    image_link = models.CharField(max_length= 200)
    date = models.DateField()
    satisfaction = models.IntegerField(range(0,5)) 