from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'userOfTag')

class Item(models.Model):
    tags = models.ManyToManyField(Tag, related_name= 'tagList')
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'userOfItem')

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name= 'userOfOutfit')
    items = models.ManyToManyField(Item, related_name= 'itemlist')
    imageLink = models.CharField(max_length= 200)
    date = models.DateField()
    satisfaction = models.IntegerField(range(0,5))