from django.db import models
from user.models import User
from item.models import Item
import datetime
import os
# Create your models here.


class Outfit(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='outfits_owned_by_user')
    items = models.ManyToManyField(Item, related_name='item_list')
    image_link = models.CharField(max_length=100)
    date = models.DateField()
    tempAvg = models.IntegerField()
    tempIcon = models.CharField(max_length=15)
    satisfaction = models.IntegerField(range(0, 5))
