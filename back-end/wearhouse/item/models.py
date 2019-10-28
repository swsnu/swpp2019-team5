from django.db import models
from django.contrib.auth.models import User
from tag.models import Tag
from outfit.models import Outfit
# Create your models here.

class Item(models.Model):
    tags = models.ManyToManyField(Tag, related_name= 'tag_list')
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'items_owned_by_user')
    outfit = models.ManyToManyField(Outfit, on_delete=models.CASCADE, related_name= 'items_included_in_outfit')